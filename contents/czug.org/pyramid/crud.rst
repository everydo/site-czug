---
created: 2012-04-23 13:04:08
creator:
description: 
title: 用Pyramid建立一个简单的CRUD程序
---

熟悉Pyramid之后，可以很方便的建立一个简单的CRUD程序。下面我们展示一下一个最简单的书籍管理应用的构建过程。

一、建立项目框架
--------------------

    pcreate -s alchemy simpleCRUD

    cd simpleCRUD

    python setup.py develop

二、建立model
------------------

model.py 加入代码：

.. code:: python

    class Book(Base):
        __tablename__ = 'book'
        id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
        name = Column(Unicode(64), unique=True, nullable=False)
        author = Column(Unicode(32), nullable=True)
        desc = Column(Unicode, nullable=True)
        ISBN = Column(Unicode(20), nullable=True)
        price = Column(Float, nullable=True)

        def __init__(self, name, author, desc, ISBN, price):
            self.name = name
            self.author = author
            self.desc = desc
            self.ISBN = ISBN
            self.price = price


initializedb.py 中main函数变更为：

.. code:: python

    def main(argv=sys.argv):
        if len(argv) != 2:
            usage(argv)
        config_uri = argv[1]
        setup_logging(config_uri)
        settings = get_appsettings(config_uri)
        engine = engine_from_config(settings, 'sqlalchemy.')
        DBSession.configure(bind=engine)
        Base.metadata.create_all(engine)
        with transaction.manager:
            book = Book(name='Python', author='chen', desc='desc', ISBN='978-7-121-06874-4', price=69.80)
            DBSession.add(book)


然后运行

initialize_simpleCRUD_db development.ini

建立数据库，并在数据库中插入第一条记录。


三、建立route结构
-------------------

在__init__.py中的main函数加入代码：

.. code:: python

    config.add_route('book_list', '/book/list')
    config.add_route('book_detail', '/book/detail/{id}')
    config.add_route('book_add', '/book/add')
    config.add_route('book_edit', '/book/edit/{id}')
    config.add_route('book_delete', '/book/delete/{id}')

通过上述URL结构即可构造一个简单的CRUD应用。


四、第一个功能list
--------------------

首先实现list功能，确保list能正确读取数据库数据。因此，构建单元测试：

.. code:: python

    def test_book_list(self):
        from .views import book_list
        request = testing.DummyRequest()
        info = book_list(request)
        self.assertEqual(len(info['books']), 1)
        self.assertEqual(info['books'][0].name, 'Python')

为了满足这个单元测试运行的条件，修改setUp函数为：

.. code:: python

    def setUp(self):
        self.config = testing.setUp()
        from sqlalchemy import create_engine
        engine = create_engine('sqlite://')
        from .models import (
            Base,
            Book,
            )
        DBSession.configure(bind=engine)
        Base.metadata.create_all(engine)
        with transaction.manager:
            book = Book(name='Python', author='chen', desc='desc', ISBN='978-7-121-06874-4', price=69.80)
            DBSession.add(book)

该setUp函数建立一个专门用于单元测试的内存数据库，然后建立所有model定义的表结构，并插入第一条记录。在完成上面的初始化之后，我们的第一个单元测试的逻辑是正确的了。

现在再来构建对应的view：

.. code:: python

    @view_config(route_name='home', renderer='simplecrud:templates/book/book_list.pt')
    @view_config(route_name='book_list', renderer='simplecrud:templates/book/book_list.pt')
    def book_list(request):
        books = DBSession.query(Book).all()
        return dict(books = books)

这里就不分页了，全部一页取出显示。并且首页就是list页。

这时候运行 python setup.py test 即可运行单元测试查看是否满足。

但单元测试满足之后，现在使用pserver development.ini还是无法看到页面内容的，这需要建立对应的渲染模版，我们这里先使用chameleon模版来完成这个工作。

.. code:: 

    <table >
      <tr>
        <th width=50>No.</th>
        <th width=200>Book Name</th>
        <th width=200>Author</th>
        <th width=200>ISBN</th>
        <th width=100>Price</th>
        <th>Op</th>
      </tr>
      <tr tal:repeat="item books">
          <td tal:content="repeat.item.number">1</td>
          <td ><a href="#" tal:content="item.name" tal:attributes="href string:${request.route_path('book_detail', id=item.id)}">name</a></td>
          <td tal:content="item.author">author</td>
          <td tal:content="item.ISBN">ISBN</td>
          <td tal:content="item.price">5</td>
          <td>
            [<a href="#" tal:attributes="href string:${request.route_path('book_edit', id=item.id)}">edit</a>]
            [<a href="#" tal:attributes="href string:${request.route_path('book_delete', id=item.id)}">delete</a>]
          </td>
      </tr>
    </table>

该模版的主要工作就是显示一个table，里面包含所有数据记录。在模版中的tal属性是chameleon定义的特殊属性。

1. tal:repeat="item books" 循环books列表，逐项取出赋值给item

2. repeat.item.number 循环计数器

3. tal:content="repeat.item.number" 替换该标签的内容部分，这里就是内容“1”

4. request.route_path('book_detail', id=item.id) 生成book_detail链接

5. tal:attributes="href string:${request.route_path('book_edit', id=item.id)}" 将标签的href属性替换


五、显示详细信息页面
----------------------

详细信息页面基本构成跟list页面基本类似，最主要的区别是，当book id不存在时，详细信息页面需要返回HTTPForbidden，我们需要在单元测试中覆盖这种情况。

.. code:: python

    def test_book_detail_unauthorized(self):
        from pyramid.httpexceptions import HTTPForbidden
        from .views import book_detail
        request = testing.DummyRequest()
        request.matchdict['id'] = 555
        info = book_detail(request)
        self.assertIsInstance(info, HTTPForbidden)

注意，如果我们想要在视图中使用raise的化，要使用self.assertRaises(HTTPForbidden, view_fn, request)这种方式来捕获。

六、使用simpleform来添加记录页面
=================================

添加记录程序一般会涉及到显示Form、存储、出错这样三种情况，因此，构建三个测试用例：

在request中什么都没有的情况下，显示form

.. code:: python

    def test_book_add_form(self):
        from pyramid_simpleform.renderers import FormRenderer
        from .views import book_add
        request = testing.DummyRequest()
        info = book_add(request)
        self.assertIsInstance(info['renderer'], FormRenderer)

在request中指定了是POST时，将取到的数据存入数据库，成功后页面转向list页面，最后验证存入正确

.. code:: python

    def test_book_add_save(self):
        from pyramid.httpexceptions import HTTPFound
        from .views import book_add
        from .models import Book

        _registerRoutes(self.config)

        request = testing.DummyRequest({'name':'a new book',
                                        'author':'a new author',
                                        'ISBN':'a new ISBN',
                                        'desc':'a new desc',
                                        'price':'6.0',
                                        'submit':'save'})
        request.method = 'POST'
        info = book_add(request)
        self.assertIsInstance(info, HTTPFound)

        added = DBSession.query(Book).filter(Book.id==2).first()

        self.assertEqual(added.name, 'a new book')
        self.assertEqual(added.author, 'a new author')

在存入数据有错误的情况下，返回提交界面，并确保不会变更数据库已有数据

.. code:: python

    def test_book_add_conflict(self):
        from pyramid_simpleform.renderers import FormRenderer
        from .views import book_add
        from .models import Book

        _registerRoutes(self.config)

        request = testing.DummyRequest({'name':'Python',
                                        'author':'a new author',
                                        'ISBN':'a new ISBN',
                                        'desc':'a new desc',
                                        'price':'6.0',
                                        'submit':'save'})
        request.method = 'POST'
        info = book_add(request)
        self.assertIsInstance(info['renderer'], FormRenderer)

        added = DBSession.query(Book).filter(Book.id==1).first()

        self.assertEqual(added.name, 'Python')
        self.assertEqual(added.author, 'chen')
        self.assertEqual(added.ISBN, '978-7-121-06874-4')


下面开始构造视图方法。一般情况下，从form读取数据都有有个验证、校验、转换过程，为了程序简单，我们采用simpleform，以及formencode用于数据校验，form构成。


.. code::

    class BookSchema(Schema):

        filter_extra_fields = True  # 过滤掉其他字段
        allow_extra_fields = True  # 允许form中有其他字段

        name = validators.String(min=2, max=64, not_empty=True)  # name最小2字符，最大64
        author = validators.String(max=32)
        desc = validators.String()
        ISBN = validators.String(max=20)
        price = validators.Number(max=1000)    # price为数字，浮点型

    @view_config(route_name='book_add', renderer='simplecrud:templates/book/book_add.pt')
    def book_add(request):
        form = Form(request, schema=BookSchema)
        if form.validate():      # 如果是正确提交

            book = Book(form.data.get("name"),
                        form.data.get("author"),
                        form.data.get("desc"),
                        form.data.get("ISBN"),
                        form.data.get("price"))

            try:
                DBSession.add(book)
                DBSession.flush()
                transaction.commit()

                return HTTPFound(location=route_path("book_list", request))  # 返回到list页面
            except IntegrityError:  # name重复，设置form出错信息
                transaction.abort()
                form.errors["global_error"] = 'database insert error, maybe book name conflict.'
            except Exception, e:
                transaction.abort()
                form.errors["global_error"] = 'database error.' + str(e)
                log.error("database error!")

        return dict(renderer=FormRenderer(form))  返回form页面

这里需要注意的是，单元测试中，并没有去构造route表，但我们程序的重定向中使用了route_path方法，因此需要在单元测试中手工构造route表：


.. code:: python

    def _registerRoutes(config):
        config.add_route('book_list', '/book/list')
        config.add_route('book_detail', '/book/detail/{id}')
        config.add_route('book_add', '/book/add')
        config.add_route('book_edit', '/book/edit/{id}')
        config.add_route('book_delete', '/book/delete/{id}')


七、edit，delete
--------------------

edit、delete基本类似new与detail，值得注意的是，edit时尽可能只访问一次数据库、减轻数据库访问量。

八、完整程序
-----------------

详见 https://github.com/eryxlee/pyramid_koans/tree/master/simpleCRUD
