module.exports = function(app,connection){

    app.get('/usercard', function(req,res){
        var uid = req.query.id;
        var sql = 'select* from usercard where uid=?;';
        var par = [uid];

        connection.query(sql,par,function(err, rows, fields) {
            if (!err)
                res.send(rows);
            else
              console.log('Error while performing Query.', err);
          });
        
    });

    app.get('/cardlist', function(req,res){
        var sql = 'select* from cards;'

        connection.query(sql,function(err, rows, fields) {
            var cardinfo = '';
            for(var i=0;i<rows.length;i++)
            {
                cardinfo = cardinfo + '<b>CID</b>: ' + rows[i].cid + ' <b>Card name</b>: ' + rows[i].cname;
                cardinfo = cardinfo + ' <b>Rarity</b>: ' + rows[i].rarity + ' <b>Attck</b>: ' + rows[i].att;
                cardinfo = cardinfo + ' Defense: ' + rows[i].def + '<p>';
            }


            if (!err)
                res.send(cardinfo);
            else
              console.log('Error while performing Query.', err);
          });
        
    });





};