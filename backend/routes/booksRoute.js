import express from 'express';
import { Book } from "../models/bookModel.js";


const router = express.Router();

// Route for save a new book
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'send all fields are required: title, author, publishYear'
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);

        return res.status(201).send({
            message: 'Book created successfully',
            book
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message
        });
    }
});

// Route for Get All Books from database
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message
        });
    }
});

// Route for Get One Book from database by id
router.get('/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message
        });
    }
});

// Route for update a book
router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'send all fields are required: title, author, publishYear'
            });
        }

        const {
            id
        } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if (!result) {
            return res.status(404).json({
                message: 'Book not found'
            })
        }
        return res.status(200).send({
            message: 'Book updated successfully',
            result
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message
        });
    }

});

// Route for delete a book
router.delete('/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({
                message: 'Book not found'
            });
        } else {
            return res.status(200).send({
                message: 'Book deleted successfully',
                result
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message
        });
    }
});

export default router;


