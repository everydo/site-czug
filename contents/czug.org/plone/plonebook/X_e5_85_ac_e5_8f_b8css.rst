---
created: 2005-12-14 14:34:29
creator: panjy
description: ''
title: 公司css
---
/* 来源：<a href="http://www.zetaweb.com/ploneCustom.css">http://www.zetaweb.com/ploneCustom.css</a> */

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
    background: white url("img/bg_pc") repeat-y;
    border: 1px solid #666666;
    border-style: none solid solid;
    }

#visual-column-wrapper {
    }

#portal-column-content #content {
    background: white;
    border: none;
    }

#portal-column-one {
    background: url("img/bg_one") no-repeat 0 100px;
    }
#portal-column-one .visualPadding {
    background: white;
    width: 134px; 
    margin: 30px 10px 250px;
    padding: 0;
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
    height: 170px;
    margin: 0;
    padding: 0;
    border: none;
}

#portal-logo {
    /* 1 - global_logo */
    display: none; }

#portal-skinswitcher {
    /* 2 - global_skinswitcher */
    display: none; }

#portal-siteactions {
    /* 3 - global_siteactions */
    }
#portal-siteactions  .zeta_dirty {
    background: url("img/dirty") no-repeat;
    }
#portal-siteactions .zeta_corporate {
    background: url("img/corp") no-repeat;
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
    background: white;
    border-collapse: collapse;
    border: none;
}

#portlet-navigation-tree .portletContent {
    padding: 0.5em;
    }
#portlet-navigation-tree h5 {
    padding: 28px 0 0 0;
    overflow: hidden;
    background-image: url("img/nav");
    background-repeat: no-repeat;
    
    height: 0px !important;
    height /**/:28px;
    border: 0;
    }
#portlet-navigation-tree a {
    color: black;
    font-size: 7pt;
    font-weight: normal;
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
    font-weight: normal;
    color: #00A251;
    margin: 0;
    }
#portlet-contact div a:hover {
    color: black;
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
    border: none;
    }
    
a:hover {
    color: black;
    }

#document-text dd {
    margin-left: 1em;
    }



/*  */