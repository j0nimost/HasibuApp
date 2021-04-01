const appError = require('../utils/appError');

exports.getAllAsync = Model => async(req, res, next) => {
    try
    {
        const allItems = await Model.find();

        // console.log(allItems);
        res.status(200).json({
            status: 'Success',
            data: allItems
        });

    } catch (error) {
        next(error);
        
    }
};


exports.getAsync = Model => async(req, res, next) => {
    try{

        const item = await Model.findById(req.params.id);

        if(!item){
            return next(new appError(404, 'Not Found', 'Record not Found'), req, res, next);
        }

        res.status(200).json({
            status:'Success',
            data: item
        });


    }catch(error){
        next(error);
    }
};

exports.addAsync = Model => async(req, res, next) => {

    try {

        const item = await Model.create(req.body);

        res.status(201).json({
            status: 'Success',
            data: item
        });
        
    } catch (error) {
        next(error);
    }
}

exports.deleteAsync = Model => async(req, res, next) =>{
    try {
        const item = await Model.findByIdAndDelete(req.params.id);

        if(!item){
            return next(new appError(404, 'Not Found', 'Record not Found'), req, res, next);
        }

        res.status(204).json({
            status: 'Success',
            data: null
        });

    } catch (error) {
        next(error);
    }
};
