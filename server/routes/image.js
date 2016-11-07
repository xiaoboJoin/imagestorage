var express = require('express');
var router = express.Router();
var ImageModel = require('../model/image');

/* GET users listing. */

router.get('/', function(req, res, next) {
    var offset = req.params.offset || 0;
    var limit = req.params.limit || 0;
    // image.find({}, function(err, data) {
    //     if (err) {
    //     } else {
    //     }
    // })
    // ImageModel
    //     .find({})
    //     .offset(offset)
    //     .limit(limit)
    //     .exec(function(err, data) {

    //     })
    ImageModel.find({}, function(err, data) {
        if (err) {
            res.send({
                code: -1,
                message: err.message,
            });

        } else {
            res.send({
                code: 0,
                data: {
                    images: data || [],
                }
            });

        }

    })
});

router.get('/:id', function(req, res, next) {
    ImageModel.findById(req.params.id, function(err, item) {

    });

});

router.get('/:url', function(req, res, next) {
    // ImageModel.findById(req.params.url, function(err, item) {

    // });
    ImageModel.find({ url: req.params.url }, function(err, data) {
        if (err) {
            res.send({
                code: -1,
                message: "no data is found"
            });
        } else {
            res.send({
                code: 0,
                data: {
                    images: data || [],
                }
            });
        }
    })

});

router.post('/new', function(req, res, next) {
    var image = req.body.image;
    if (!image.url && !image.imageData) {
        res.send({
            code: -1,
            message: "image data is missing"
        });
    }
    ImageModel.find({ url: image.url }, function(err, data) {
        if (err) {
            if (!image.url && !image.imageData) {
                res.send({
                    code: -1,
                    message: err.name,
                });
            }
        } else {
            if (data.length == 0) {
                var item = new ImageModel({
                    name: image.name || '',
                    url: image.url,
                    width: image.width || 0,
                    height: image.height || 0,
                    imageData: image.imageData || '',
                });
                item.save(function(err, data) {
                    res.send({
                        code: 0,
                        data: {
                            images: data,
                        }
                    });
                });
            } else {
                res.send({
                    code: 0,
                    data: {
                        images: data,
                    }
                })
            }

        }
    })

})

router.post('/new/list', function(req, res, next) {
    // body...
    var list = req.body.images;
    console.log(list);
    var count = list.length;
    var images = [];
    list.forEach(function(image) {
        if (image.url) {
            ImageModel.find({ url: image.url }, function(err, data) {
                if (err) {
                    counter();
                } else {
                    if (data.length == 0) {
                        var item = new ImageModel({
                            name: image.name || '',
                            url: image.url,
                            width: image.width || 0,
                            height: image.height || 0,
                            imageData: image.imageData || '',
                        });
                        item.save(function(err, data) {
                            if (data) {
                                images.push(data);
                            }
                            counter();
                        });
                    } else {
                        images = images.concat(data);
                        counter();
                    }
                }
            })
        } else {
            counter();
        }
    })
    function counter() {
        if (count-- && count == 0) {
            console.log(images);
            res.send({
                code: 0,
                data: {
                    images: images,
                }
            })
        }
    }
})






module.exports = router;
