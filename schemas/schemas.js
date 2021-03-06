const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {

    chatSchema: new Schema({
        date: { type: Date, default: Date.now },
        chatData: { type: Schema.Types.Mixed, required: true }
    }),

    userSchema: new Schema({
        access: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        resetPasswordToken: {type: String, required: false },
        resetPasswordExpiration: {type: Date, required: false}
    }),

    contentSchema: {},

    blogSchema: new Schema({
        author: { type: String, required: false },
        title: { type: String, required: true }, 
        date: { type: Date, default: Date.now }, 
        content: { type: String, required: true },
        imageURL: { type: String, required: true },
        readTime: { type: String, required: true },
        likes: { type: Number, required: false, default: 0 },
        url: { type: String, required: true, unique: true },
        comments: [ { type: String, required: false } ]
    }),

    eventSchema: new Schema({
        organizer: { type: String, required: true },
        title: { type: String, required: true },
        date: { type: Date, required: true },
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
    }),

    announcementSchema: new Schema({
        image: String,
        date: Date,
        name: String,
        content: String
    }),

    surveySchema: new Schema({
        user: { type: Schema.Types.ObjectId, ref: "User", required: false, default: null },
        volunteer: { type: String, ref: "volunteer", required: true },
        preChat: {
            type: new Schema({
                feelings: [String],
                purposes: [String],
                suicidal: Boolean,
                disclaimer: { type: Boolean, required: true }
            }),
            required: true
        },
        postChat: {
            type: new Schema({
                experience: Number,
                age: String,
                gender: String,
                race: String,
                saveChat: Boolean
            }),
            required: false,
            default: {}
        }
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
 *                  date:
 *                      type: string
 *                      format: date
 *                  chatData:
 *                      type: object
 *              required: [chatData]
 * 
 *          Blog:
 *              type: object
 *              properties:
 *                  author:
 *                      type: string
 *                  title: 
 *                      type: string
 *                  date: 
 *                      type: string
 *                      format: date
 *                  content: 
 *                      type: string 
 *                  likes: 
 *                      type: number
 *                  url: 
 *                      type: string
 *                  imageUrl:
 *                      type: string
 *                  readTime: 
 *                      type: string
 *                  comments:
 *                      type: array
 *                      items:
 *                          type: string
 *              required: [author, title, content, url, imageUrl, readTime]
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
 *                      format: date
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
 * 
 *          Survey:
 *              type: object
 *              properties:
 *                  user:
 *                      type: object
 *                  volunteer:
 *                      type: object
 *                  preChat:
 *                      type: object
 *                      properties: 
 *                          feelings:
 *                              type: array
 *                              items: 
 *                                  type: string
 *                          purposes:
 *                              type: array
 *                              items:
 *                                  type: string
 *                          suicidal: 
 *                              type: boolean
 *                          disclaimer:
 *                              type: boolean
 *                      required: [disclaimer]
 *                  postChat:
 *                      $ref: "#/components/schemas/postChat"
 *              required: [volunteer, preChat]
 * 
 *          postChat:
 *              type: object
 *              properties:
 *                  experience:
 *                      type: number
 *                      minimum: 0
 *                      maximum: 5
 *                  age:
 *                      type: string
 *                  gender:
 *                      type: string
 *                  race:
 *                      type: string
 *                  saveChat:
 *                      type: boolean
 *                          
 */

