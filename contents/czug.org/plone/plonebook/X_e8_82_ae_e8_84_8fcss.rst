---
created: 2005-12-14 14:34:28
creator: panjy
description: ''
title: 肮脏css
---
/* 来源：<a href="http://www.zetaweb.com/dirty/ploneCustom.css">http://www.zetaweb.com/dirty/ploneCustom.css</a> */

/*
** begin structure
*/

body {
    margin: 8px;
    background: #F0F0F0;
    }

#visual-portal-wrapper {
    width: 755px;
    margin: 0 auto;
    }


#portal-columns {
    clear: both;
    background: white url("img/bg_one") no-repeat;
    border: 1px solid #666666;
    border-style: none solid solid;
    }

#portal-column-content #content {
    background: white;
    border: 1px solid #666666;
    border-style: none none none solid;
    }

#portal-column-one .visualPadding {
    padding: 10px;
    }

.documentEditable {
    padding: 0 10px 10px ! important;
}

    

/*
** end structure
**
************************************************
**
** begin portal-toppers
*/

#portal-top {
    background: url("img/bg_top") no-repeat;
    height: 150px;
    margin: 0;
    padding: 0;
    border: 1px solid #666666;
    border-style: solid solid none;
}

#portal-logo {
    /* 1 - global_logo */
    position: absolute;
    top: 33px;
    left: 18px;
    margin: 0;
    padding: 0;
    }

#portal-skinswitcher {
    /* 2 - global_skinswitcher */
    display: none; }

#portal-siteactions {
    /* 3 - global_siteactions */
    position: absolute;
    top: 11px;
    right: 16px;
    width: 100px;
    margin: 0;
    padding: 0;
    z-index: 2;
    }
#portal-siteactions a {
    display: block;
    float: right;
    padding: 19px 0 0 0;
    margin: 0 0 10px;
    width: 52px;
    height: 0px !important;
    height /**/: 19px;
    overflow: hidden;
    }
#portal-siteactions .zeta_dirty {
    background: url("img/dirty") no-repeat;
    }
#portal-siteactions .zeta_corporate {
    background: url("img/corp") no-repeat;
    }
#portal-siteactions .pick {
    color: white;
    font-weight: bold;
    margin: 0 0 10px;
    padding: 0;
    float: right;
    }



#portal-searchbox {
    /* 4 - global_searchbox */
    display: none; }

#portal-globalnav {
    /* 5 - global_sections */
    display: none; }

#portal-personaltools {
    /* 6 - global_personalbar */
    display: none; }

#portal-breadcrumbs {
    /* 7 - global_pathbar */
    display: none; }



/*
** end portal-toppers
**
************************************************
**
** begin portlets
*/

.portlet h5 { 
    background: #00A251;
    border: 1px solid #666666;
    border-style: solid solid none solid;
    padding: 0em 10px;
    font-size: 1em;
    height: 1.4em;
    font-weight: normal;
    white-space: nowrap;
    
    display: block;
    color: white;
    font-weight: bold;
    text-transform: none;
}
.portletBody {
    background: transparent;
    border-collapse: collapse;
    border: 1px solid #666666;
}

#portlet-navigation-tree .portletContent {
    padding: 0.5em;
    }
#portlet-navigation-tree a {
    color: black;
    font-weight: bold;
    display: block;
    margin: 0 0 8px;
    text-indent: -10px;
    padding: 0 0 0 10px;
    }
#portlet-navigation-tree a:hover {
    color: #00A251;
    }

#portlet-contact {
    color: #666666;
    margin-right: -10px;
    padding: 0 1em;
    }
#portlet-contact address {
    font-weight: normal;
    font-style: normal;
    font-size: 7pt;
    }
#portlet-contact div {
    margin: 5px 0 0;
    }
#portlet-contact div a {
    font-weight: bold;
    color: black;
    margin-left: -0.5em;
    }
#portlet-contact div a:hover {
    color: #00A251;
    }

/*
** end portlets
**
************************************************
**
** begin portal-bottoms
*/

.visualClear {
    }

#portal-footer {
    color: #CCCCCC;
    border: 0;
    background: none;
    float: right;
    text-align: right;
    margin: 0;
    padding: 0;
    }
#portal-footer a {
    color: #CCCCCC;
    text-decoration: underline;
    }
#portal-footer a:hover {
    color: black;
    }

#portal-colophon {
    display: none; }


/*
** end portal-bottoms
**
************************************************
**
** begin content styles
*/

h1, h2, h3, h4, h5, h6 {
    clear: both;
    border: none;
    }
    
a:hover {
    color: black;
    }

#document-text dd {
    margin-left: 1em;
    }

#documentFilesListing {
    display: none;
    }

/*  */