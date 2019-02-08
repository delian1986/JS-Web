const User = require('../models/User')
const Thread = require('../models/Thread')
const Message = require('../models/Message')

module.exports = {
    findPost: async (req, res) => {
        const currUser = req.user.id
        const receiver = req.body.username

        try {
            const recUser = await User.findOne({ username: receiver })
            if (!recUser) {
                return res.redirect('/')
            }
            const thread = await Thread.findOne({
                users: { $all: [currUser, recUser._id] }
            })
            if (!thread) {
                thread = await Thread.create({
                    users: [currUser, recUser._id]
                })
            }

            res.redirect(`/thread/${recUser._id}`)
        } catch (e) {
            console.log(e)
        }
    },
    chatGet: async (req, res) => {
        const currUserId = req.user._id
        const receiver = req.params.userId

        try {
            const recUser = await User.findById(receiver)

            const thread = await Thread.findOne({
                users: { $all: [currUserId, recUser._id] }
            }).populate('messages')

            const currUser = await User.findById(currUserId)

            const recUsername = recUser.username
            const blockId = recUser._id
            let amBlocked = false
            let otherIsBlocked = false

            if (recUser.blockedUsers.indexOf(currUserId) > -1) {
                amBlocked = true
            }

            if (currUser.blockedUsers.indexOf(blockId) > -1) {
                otherIsBlocked = true
            }

            thread.messages.forEach(message => {
                if (message.receiver.toString() !== req.user._id.toString()) {
                    message.isMine = true;
                }
                if (message.content.startsWith('http') || message.content.endsWith('.jpg')) {
                    message.isImage = true;
                }
            });

            res.render(`threads/chatroom`, {
                thread,
                recUsername,
                blockId,
                otherIsBlocked,
                amBlocked
            })
        } catch (e) {
            console.log(e)
        }
    },
    chatPost: async (req, res) => {
        const threadId = req.body.threadId
        const content = req.body.message
        const receiverId = req.params.userId

        try {
            const message = await Message.create({
                content: content,
                receiver: receiverId
            })
            const thread = await Thread.findById(threadId)
            thread.messages.push(message._id)
            thread.save()

            res.redirect(`/thread/${receiverId}`)

        } catch (e) {
            console.log(e)
        }
    },
    threadDelete: async (req, res) => {
        const threadId=req.params.threadId

        try {
            await Thread.findOneAndDelete({"_id":threadId})

            res.redirect('/')

        } catch (e) {
            console.log(e)
        }
    }
}