const express = require('express');
const router = express.Router();

const books = [];

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Returns a list of books
 *     description: Returns a comprehensive list of all books
 *     responses:
 *       200:
 *         description: Fetched Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The auto generated id of the book
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   publishedDate:
 *                     type: string
 *                     format: date
 *                   summary:
 *                     type: string
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.get("/books", (req, res) => {
  res.status(200).json(books);
});

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Returns a specific book
 *     description: Returns a book with the parameter's id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           description: The auto generated id of the book
 *         required: true
 *         description: The id of the book
 *     responses:
 *       200:
 *         description: Fetched Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto generated id of the book
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 publishedDate:
 *                   type: string
 *                   format: date
 *                 summary:
 *                   type: string
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.get("/books/:id", (req, res) => {
  try {
    const { id } = req.params;
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
      res.status(200).json({ "message": `This is the book with id ${id}`, "body": books[bookIndex] });
    } else {
      res.status(404).json({ "message": `The book with id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ "message": `Unable to fetch the book with id ${id}` });
  }
});

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     description: Create a new book with given data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedDate:
 *                 type: string
 *                 format: date
 *               summary:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto generated id of the book
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 publishedDate:
 *                   type: string
 *                   format: date
 *                 summary:
 *                   type: string
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       409:
 *         description: Conflict
 *       500:
 *         description: Server Error
 */
router.post("/books", (req, res) => {
  try {
    const { title, author, publishedDate, summary } = req.body;
    const newBook = { id: Date.now().toString(), title, author, publishedDate, summary };
    books.push(newBook);
    res.status(200).json(newBook);
  } catch (error) {
    res.status(500).json({ "message": "Unable to create new book" });
  }
});


/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Edits a specific book
 *     description: Returns an edited book with the parameter's id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedDate: 
 *                 type: string
 *                 format: date
 *               summary: 
 *                 type: string
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           description: The auto generated id of the book
 *         required: true
 *         description: The id of the book
 *     responses:
 *       200:
 *         description: Edited Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto generated id of the book
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 publishedDate:
 *                   type: string
 *                   format: date
 *                 summary:
 *                   type: string
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.put("/books/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishedDate, summary } = req.body;
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
      const updatedBook = { ...books[bookIndex], title, author, publishedDate, summary };
      books[bookIndex] = updatedBook;
      res.status(200).json({ "message": `Successfully edited the book with id ${id}`, "body": updatedBook });
    } else {
      res.status(404).json({ "message": `The book with id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ "message": `Unable to edit the book with id ${id}` });
  }
});



/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Deletes a specific book
 *     description: Returns an deleted book with the parameter's id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           description: The auto generated id of the book
 *         required: true
 *         description: The id of the book
 *     responses:
 *       200:
 *         description: Deleted Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto generated id of the book
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 publishedDate:
 *                   type: string
 *                   format: date
 *                 summary:
 *                   type: string
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.delete("/books/:id", (req, res) => {
  try {
    const { id } = req.params;
    const bookIndex = books.findIndex(book => book.id == id);
    if (bookIndex !== -1) {
      books.splice(bookIndex, 1)
      res.json({"message": `Successfully deleted the book with id ${id}`});
    }else {
      res.status(404).json({ "message": `The book with id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ "message": `Unable to fetch the book with id ${id}` });
  }
});

module.exports = router;
