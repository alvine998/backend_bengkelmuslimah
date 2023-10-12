
const db = require('../models')
const vouchers = db.vouchers
const transactions = db.transactions
const Op = db.Sequelize.Op
const bcrypt = require('bcryptjs')
const fs = require('fs')
const crypto = require('crypto')
const moment = require('moment/moment')
require('dotenv').config()

// Retrieve and return all notes from the database.
exports.list = async (req, res) => {
    try {
        const size = req.query.size || 10;
        const page = req.query.page || 0;
        const offset = size * page;
        const result = await transactions.findAndCountAll({
            where: {
                deleted: { [Op.eq]: 0 },
                ...req.query.id && { id: { [Op.eq]: req.query.id } },
                ...req.query.user_id && { user_id: { [Op.eq]: req.query.user_id } },
                ...req.query.place_id && { place_id: { [Op.eq]: req.query.place_id } },
                ...req.query.voucher_id && { voucher_id: { [Op.eq]: req.query.voucher_id } },
                ...req.query.status && { status: { [Op.eq]: req.query.status } },
                ...req.query.date_start && req.query.date_end && {
                    date: { [Op.between]: [req.query.date_start, req.query.date_end] }
                }
            },
            order: [
                ['created_on', 'DESC'],
            ],
            ...req.query.pagination == 'true' && {
                limit: size,
                offset: offset
            }
        })
        return res.status(200).send({
            status: "success",
            items: result,
            total_pages: Math.ceil(result.count / size),
            current_page: page,
            code: 200
        })
    } catch (error) {
        return res.status(500).send({ message: "Server mengalami gangguan!", error: error })
    }
};

exports.create = async (req, res) => {
    try {
        ['place_id', 'user_id', 'date', 'total_price', 'status', 'user_name', 'place_name']?.map(value => {
            if (!req.body[value]) {
                return res.status(400).send({
                    status: "error",
                    error_message: "Parameter tidak lengkap " + value,
                    code: 400
                })
            }
        })
        const generateTransactionCode = () => {
            const uniqueId = Math.random().toString(36).substr(2, 9); // Generate a unique identifier
            const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, ''); // Remove separators and special characters from the timestamp
            return `TXN-${timestamp}-${uniqueId}`;
          };
        if (req.body.voucher_id) {
            const existVoucher = await vouchers.findOne({
                where: {
                    id: { [Op.eq]: req.body.voucher_id },
                    code: { [Op.eq]: req.body.voucher_code },
                    expired_at: { [Op.lte]: moment().format("YYYY-MM-DD") },
                    time_start: { [Op.gte]: moment().format("HH:mm:ss") },
                    time_end: { [Op.lte]: moment().format("HH:mm:ss") },
                    deleted: { [Op.eq]: 0 }
                }
            })
            if (!existVoucher) {
                console.log(existVoucher);
                res.status(400).send({
                    status: "error",
                    error_message: "Voucher tidak dapat digunakan",
                    code: 400
                })
                return
            }
            existVoucher.quota = existVoucher.quota - 1
            await existVoucher.save()
        }
        const payload = {
            ...req.body,
            code: generateTransactionCode()
        };
        const result = await transactions.create(payload)
        return res.status(200).send({
            status: "success",
            items: result,
            code: 200
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server mengalami gangguan!", error: error })
        return
    }
};

exports.update = async (req, res) => {
    try {
        const result = await transactions.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        if (!result) {
            return res.status(404).send({ message: "Data tidak ditemukan!" })
        }
        const payload = {
            ...req.body,
        }
        const onUpdate = await transactions.update(payload, {
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        res.status(200).send({ message: "Berhasil ubah data", update: onUpdate })
        return
    } catch (error) {
        return res.status(500).send({ message: "Gagal mendapatkan data admin", error: error })
    }
}

exports.delete = async (req, res) => {
    try {
        const result = await transactions.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.query.id }
            }
        })
        if (!result) {
            return res.status(404).send({ message: "Data tidak ditemukan!" })
        }
        result.deleted = 1
        await result.save()
        res.status(200).send({ message: "Berhasil hapus data" })
        return
    } catch (error) {
        return res.status(500).send({ message: "Gagal mendapatkan data admin", error: error })
    }
}