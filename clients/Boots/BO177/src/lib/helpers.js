let type;
if(window.location.href.indexOf('/parenting-club') > -1) {
    type = 'parentClub'
} else if(window.location.href.indexOf('https://www.boots.com/AjaxLogonForm?myAcctMain=1') > -1) {
    type = 'account'
} else if(window.location.href.indexOf('https://www.boots.com/webapp/wcs/stores/servlet/BootsLogonForm') > -1){
    type = 'register';
}

export default type;