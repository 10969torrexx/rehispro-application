const { data } = require('autoprefixer');
const db = require('../db');
const bcrypt = require('bcryptjs');

function create(formData = []) {
    if (!formData || formData.length === 0) {
        return res.status(400).json({ success: false, message: 'No Data' });
    }

    return res.status(200).json({
        success: true,
        message: 'Birth certificate created successfully',
        data: formData
    });
    
}

function read() {

}

function update() {

}

function remove() {

}

function find() {

}

module.exports = {
    create,
    read,
    update,
    remove,
    find
};