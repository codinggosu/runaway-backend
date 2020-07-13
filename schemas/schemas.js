const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {

    chatSchema: new Schema({
        messages: { 
            type: [ 
                { 
                    sender: { type: String, required: true },
                    message: { type: String, required: true } 
                } 
            ],
            required: true 
        }
    }),

    userSchema: new Schema({
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true }
    }),

    contentSchema: {},

    blogSchema: new Schema({
        user: { type: Schema.Types.ObjectId, ref: "User", required: false },
        title: { type: String, required: true }, 
        date: { type: String, default: new Date().toJSON() }, 
        content: { type: String, required: true },
        likes: { type: Number, required: false, default: 0 },
        url: { type: String, required: true, unique: true },
        comments: [ { type: String, required: false } ]
    }),

    eventSchema: new Schema({
        organizer: { type: String, required: true },
        title: { type: String, required: true },
        date: { type: String, default: new Date().toJSON() },
        content: { type: String, required: true },
        location: { 
            type: {
                type: String,
                enum: ["Point"],
                required: true,
            },
            coordinates: {
                type: [Number],
                required: true
            }
        }
    }),

    resourceSchema: new Schema({
        title: { type: String, required: true },
        url: { type: String, required: false },
        categories: [ { type: String, required: false } ]
    })
}

/**
 * @swagger
 * tags:
 *     - name: Chat
 *     - name: Blog
 *     - name: Event
 *     - name: Resource
 *  
 * components:
 *      schemas:
 *          Chat:
 *              type: object
 *              properties:
 *                  messages:
 *                      type: array
 *                      items: 
 *                          type: object
 *                          properties: 
 *                              sender: 
 *                                  type: string
 *                              message:
 *                                  type: string
 *                          required: 
 *                              - sender
 *                              - message
 *              required:
 *                  - messages 
 * 
 *          Blog:
 *              type: object
 *              properties:
 *                  user:
 *                      type: string
 *                  title: 
 *                      type: string
 *                  date: 
 *                      type: string
 *                  content: 
 *                      type: string 
 *                  likes: 
 *                      type: number
 *                  url: 
 *                      type: string
 *                  comments:
 *                      type: array
 *                      items:
 *                          type: string
 *              required: [user, title, date, content, url]
 * 
 *          Event:
 *              type: object
 *              properties: 
 *                  organizer: 
 *                      type: string
 *                  title:
 *                      type: string
 *                  date: 
 *                      type: string
 *                  content: 
 *                      type: string
 *                  location: 
 *                      type: object
 *                      properties:
 *                          type: 
 *                              type: string
 *                              enum: [Point]
 *                          coordinates:
 *                              type: array
 *                              items: 
 *                                  type: number
 *                              minItems: 2
 *                              maxItems: 2
 *                      required: 
 *                          - type
 *                          - coordinates
 *              required: [organizer, title, date, content, location]    
 * 
 *          Resource:
 *              type: object
 *              properties:
 *                  title: 
 *                      type: string
 *                  url: 
 *                      type: string 
 *                  categories:
 *                      type: array
 *                      items:
 *                          type: string
 *              required: [title]    
 */

