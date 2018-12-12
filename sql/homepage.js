var html_dir = './views/';

module.exports = function(app,connection){

    app.get('/', function(req,res){
        res.sendfile( html_dir + 'page.html');
    });

};