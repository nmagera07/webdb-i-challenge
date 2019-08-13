const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    const { limit, sortby, sortdir } = req.query

    const query = db.select('*').from('accounts')
    if (limit) {
        query.limit(limit)
    }

    if (sortby) {
        if (sortdir) {
        query.orderBy(sortby, sortdir)
    } else {
        query.orderBy(sortby)
    }
        
    }
        query 
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(error => {
            res.status(500).json({ error: 'Cannot retrieve accounts.'})
        })
})

server.get('/:id', (req, res) => {
    db('accounts').where({ id: req.params.id })
        .first()
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => {
            res.status(500).json({ error: 'Cannot retrieve accounts.'})
        })
})

server.post('/', (req, res) => {
    const body = req.body
    db('accounts')
        .insert(body)
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => {
            res.status(500).json({ error: 'Cannot retrieve accounts.'})
        })
})

server.put('/:id', (req, res) => {
    const { id } = req.params
    const body = req.body
    db('accounts')
        .where('id', '=', id)
        .update(body)
        .then(count => {
            res.status(200).json(count)
        })
        .catch(error => {
            res.status(500).json({ error: 'Cannot retrieve accounts.'})
        })
})

server.delete('/:id', (req, res) => {
    const { id } = req.params
    db('accounts')
        .where('id', '=', id)
        .del()
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => {
            res.status(500).json({ error: 'Cannot retrieve accounts.'})
        })
})

module.exports = server;