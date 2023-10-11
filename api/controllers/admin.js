
const db = require('../models')
const admins = db.admins
const Op = db.Sequelize.Op
const bcrypt = require('bcryptjs')
const fs = require('fs')
const crypto = require('crypto')
require('dotenv').config()

// Retrieve and return all notes from the database.
exports.list = async (req, res) => {
    try {
        const size = req.query.size || 10;
        const page = req.query.page || 0;
        const offset = size * page;

        const result = await admins.findAndCountAll({
            where: {
                deleted: { [Op.eq]: 0 },
                ...req.query.search && {
                    [Op.or]: [
                        { name: { [Op.like]: `%${req.query.search}%` } },
                        { email: { [Op.like]: `%${req.query.search}%` } },
                        { phone: { [Op.like]: `%${req.query.search}%` } },
                    ]
                },
                ...req.query.id && { id: { [Op.eq]: req.query.id } },
                ...req.query.role && { role: { [Op.eq]: req.query.role } },
                ...req.query.email && { email: { [Op.eq]: req.query.email } },
                ...req.query.phone && { phone: { [Op.eq]: req.query.phone } },
                ...req.query.status && { status: { [Op.eq]: req.query.status } },
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
            total_items: result.length,
            total_pages: Math.ceil(result.count / size),
            items: result,
            code: 200
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server mengalami gangguan!", error: error })
        return
    }
};

exports.create = async (req, res) => {
    try {
        const existadmins = await admins.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                email: { [Op.eq]: req.body.email }
            }
        })
        if (existadmins) {
            return res.status(404).send({ message: "Email telah terdaftar!" })
        }
        const payload = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 8)
        };
        const result = await admins.create(payload)
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

exports.login = async (req, res) => {
    try {
        const existadmins = await admins.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                email: { [Op.eq]: req.body.email }
            }
        })
        if (!existadmins) {
            return res.status(404).send({ message: "Email tidak ditemukan!" })
        }
        const comparePassword = await bcrypt.compare(req.body.password, existadmins.password)
        if (!comparePassword) {
            return res.status(404).send({ message: "Password Salah" })
        }
        res.status(200).send({ message: "Berhasil login", result: existadmins })
        return
    } catch (error) {
        return res.status(500).send({ message: "Gagal mendapatkan data admin", error: error })
    }
}

exports.update = async (req, res) => {
    try {
        const result = await admins.findOne({
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
            ...req.body.password && { password: bcrypt.hashSync(req.body.password, 8) }
        }
        const onUpdate = await admins.update(payload, {
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        const results = await admins.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        res.status(200).send({ message: "Berhasil ubah data", result: results, update: onUpdate })
        return
    } catch (error) {
        return res.status(500).send({ message: "Gagal mendapatkan data admin", error: error })
    }
}

exports.delete = async (req, res) => {
    try {
        const result = await admins.findOne({
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