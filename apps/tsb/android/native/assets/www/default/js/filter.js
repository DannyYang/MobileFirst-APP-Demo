
/* JavaScript content from js/filter.js in folder common */
app.filter('dateFormat', function () {
    return function (dateString) {
        if (!dateString)
            return;
        return moment(dateString.split('.')[0]).format('YYYY-DD-MM');
    };
});

app.filter('typeFormat', function () {
    return function (typeString) {
        if (!typeString)
            return "";
        if(typeString == 'D')
        	return "存入";
        else if(typeString == 'E')
        	return "支出";        
    };
});