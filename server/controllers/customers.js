const fs = require("fs");
const joi = require('joi');
const { Customer } = require('../models/Customer');


module.exports = {
    reset: async function (req, res) {
        Customer.collection.drop()

        fs.readFile("./data/customers.json", "utf8", (err, data) => {
            if (err) {
                console.log(err);
                res.json("Somthing went wrong :(")
                return
            }

            const jsData = JSON.parse(data);
            jsData.customers.forEach(element => {
                new Customer(element).save()
            });

            res.json("Data successfuly updated :)")
        })
    },

    getLastWeek: async function (req, res, next) {
        try {
            const result = await Customer.find({ createdAt: { $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000) } });
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: 'error getting customers' });
        }
    },


    getAll: async function (req, res, next) {
        try {
            const result = await Customer.find({});
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: 'error getting customers' });
        }
    },

    getOne: async function (req, res, next) {
        try {
            const schema = joi.object({
                id: joi.string().required(),
            });

            const { error, value } = schema.validate(req.params);

            if (error) {
                console.log(error.details[0].message);
                throw `error get details`;
            }

            const customer = await Customer.findById(value.id);
            if (!customer) throw "Invalid customer id, no such customer.";
            res.json(customer);
        }
        catch (err) {
            res.status(400).json({ error: "Invalid data" });
            console.log(`Error: ${err}`);
        }
    },

    addNew: async function (req, res, next) {
        try {
            const schema = joi.object({
                firstName: joi.string().min(2).max(200).required(),
                lastName: joi.string().min(2).max(200).required(),
                phone: joi.string().min(9).max(12).required(),
                email: joi.string().min(6).max(255).required(),
                address: joi.string().min(6).max(350).empty('', null),
            });

            const { error, value } = schema.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                throw 'error add customer';
            }

            const customer = new Customer(value);
            const newCustomer = await customer.save();
            res.json(newCustomer);
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json({ error: `error adding customer` });
        }
    },

    updateDetails: async function (req, res, next) {
        try {
            const schema = joi.object({
                firstName: joi.string().min(2).max(200),
                lastName: joi.string().min(2).max(200),
                phone: joi.string().min(9).max(12),
                email: joi.string().min(6).max(255),
                address: joi.string().min(6).max(350).empty('', null)
            }).min(1);

            const { error, value } = schema.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                throw 'error updating customer';
            }

            const filter = {
                _id: req.params.id
            };

            const customer = await Customer.findOneAndUpdate(filter, value);
            if (!customer) throw "No customer with this ID in the database";
            const updated = await Customer.findById(customer._id);
            res.json(updated);
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json({ error: err.message });
        }
    },

    deleteOne: async function (req, res, next) {
        try {
            const schema = joi.object({
                id: joi.string().required(),
            });

            const { error, value } = schema.validate(req.params);

            if (error) {
                console.log(error.details[0].message);
                throw `error delete customer`;
            }

            const deleted = await Customer.findOneAndRemove({
                _id: value.id
            });

            if (!deleted) throw "failed to delete";
            res.json(deleted);
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json({ error: `error delete customer` });
        }
    },
}