const queryDB = require('./db');

class HotGirl {
    constructor(id, name, image, like, dislike) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.like = like;
        this.dislike = dislike;
    }

    getHotGirl(cb) {
        const sql = 'SELECT * FROM "hotgirls" WHERE id = $1';
        queryDB(sql, [this.id], (err, result) => {
            if (err) return cb(err);
            cb(undefined, result.rows[0]);
        });
    }

    likeGirl(cb) {
        const sql = 'UPDATE public."hotgirls" SET "like"="like" + 1 WHERE id = $1 RETURNING "like"';
        queryDB(sql, [this.id], (err, result) => {
            if (err) return cb(err);
            cb(undefined, result.rows[0].like);
        });
    }

    // dislikeGirl(cb) {
    //    const sql = 'UPDATE public."hotgirls" SET "dislike"="dislike" - 1 WHERE id = $1 RETURNING "dislike"';
    //     queryDB(sql, [this.id], (err, result) => {
    //         if (err) return cb(err);
    //         cb(undefined, result.rows[0].like);
    //     });
    // }


}

module.exports = HotGirl;
