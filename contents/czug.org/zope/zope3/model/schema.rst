Widgets Demo Interfaces
================================

::

    import datetime
    import decimal
    import zope.interface
    import zope.schema
    from zope.schema import vocabulary

    vocab = vocabulary.SimpleVocabulary([
        vocabulary.SimpleVocabulary.createTerm(1, '1', u'One'),
        vocabulary.SimpleVocabulary.createTerm(2, '2', u'Two'),
        vocabulary.SimpleVocabulary.createTerm(3, '3', u'Three'),
        vocabulary.SimpleVocabulary.createTerm(4, '4', u'Four'),
        vocabulary.SimpleVocabulary.createTerm(5, '5', u'Five')
        ])

    class IObjectSchema(zope.interface.Interface):

        field1 = zope.schema.TextLine(
            title=u'Field 1')

        field2 = zope.schema.Int(
            title=u'Field 2')


    class IAllFields(zope.interface.Interface):
        """An interface containing all possible fields."""

        asciiField = zope.schema.ASCII(
            title=u'ASCII',
            description=u'This is an ASCII field.',
            default='This is\n ASCII.')

        asciiLineField = zope.schema.ASCIILine(
            title=u'ASCII Line',
            description=u'This is an ASCII-Line field.',
            default='An ASCII line.')

        boolField = zope.schema.Bool(
            title=u'Boolean',
            description=u'This is a Bool field.',
            default=True)

        checkboxBoolField = zope.schema.Bool(
            title=u'Boolean (Checkbox)',
            description=u'This is a Bool field displayed suing a checkbox.',
            default=True)

        bytesField = zope.schema.Bytes(
            title=u'Bytes',
            description=u'This is a Bytes field.',
            default='\10\45\n\32',
            required=False)

        bytesLineField = zope.schema.BytesLine(
            title=u'Bytes Line',
            description=u'This is a bytes line field.',
            default='A Bytes line.')

        choiceField = zope.schema.Choice(
            title=u'Choice',
            description=u'This is a choice field.',
            default=3,
            vocabulary=vocab)

        optionalChoiceField = zope.schema.Choice(
            title=u'Choice (Not Required)',
            description=u'This is a non-required choice field.',
            vocabulary=vocab,
            required=False)

        promptChoiceField = zope.schema.Choice(
            title=u'Choice (Explicit Prompt)',
            description=u'This is a choice field with an explicit prompt.',
            vocabulary=vocab,
            required=False)

        dateField = zope.schema.Date(
            title=u'Date',
            description=u'This is a Date field.',
            default=datetime.date(2007, 4, 1))

        datetimeField = zope.schema.Datetime(
            title=u'Date/Time',
            description=u'This is a Datetime field.',
            default=datetime.datetime(2007, 4, 1, 12))

        decimalField = zope.schema.Decimal(
            title=u'Decimal',
            description=u'This is a Decimal field.',
            default=decimal.Decimal('12.87'))

        dictField = zope.schema.Dict(
            title=u'Dictionary',
            description=u'This is a Dictionary field.',
            key_type=zope.schema.TextLine(),
            value_type=choiceField,
            default={u'a': 1, u'c': 3})

        dottedNameField = zope.schema.DottedName(
            title=u'Dotted Name',
            description=u'This is a DottedName field.',
            default='z3c.form')

        floatField = zope.schema.Float(
            title=u'Float',
            description=u'This is a Float field.',
            default=12.8)

        frozenSetField = zope.schema.FrozenSet(
            title=u'Frozen Set',
            description=u'This is a FrozenSet field.',
            value_type=choiceField,
            default=frozenset([1, 3]) )

        idField = zope.schema.Id(
            title=u'Id',
            description=u'This is a Id field.',
            default='z3c.form')

        intField = zope.schema.Int(
            title=u'Integer',
            description=u'This is a Int field.',
            default=12345)

        listField = zope.schema.List(
            title=u'List',
            description=u'This is a List field.',
            value_type=choiceField,
            default=[1, 3])

        objectField = zope.schema.Object(
            title=u'Object',
            description=u'This is an Object field.',
            schema=IObjectSchema)

        passwordField = zope.schema.Password(
            title=u'Password',
            description=u'This is a Password field.',
            default=u'mypwd',
            required=False)

        setField = zope.schema.Set(
            title=u'Set',
            description=u'This is a Set field.',
            value_type=choiceField,
            default=set([1, 3]) )

        sourceTextField = zope.schema.SourceText(
            title=u'Source Text',
            description=u'This is a SourceText field.',
            default=u'<source />')

        textField = zope.schema.Text(
            title=u'Text',
            description=u'This is a Text field.',
            default=u'Some\n Text.')

        textLineField = zope.schema.TextLine(
            title=u'Text Line',
            description=u'This is a TextLine field.',
            default=u'Some Text line.')

        timeField = zope.schema.Time(
            title=u'Time',
            description=u'This is a Time field.',
            default=datetime.time(12, 0))

        timedeltaField = zope.schema.Timedelta(
            title=u'Time Delta',
            description=u'This is a Timedelta field.',
            default=datetime.timedelta(days=3))

        tupleField = zope.schema.Tuple(
            title=u'Tuple',
            description=u'This is a Tuple field.',
            value_type=choiceField,
            default=(1, 3))

        uriField = zope.schema.URI(
            title=u'URI',
            description=u'This is a URI field.',
            default='http://zope.org')

        hiddenField = zope.schema.TextLine(
            title=u'Hidden Text Line',
            description=u'This is a hidden TextLine field.',
            default=u'Some Hidden Text.')
