import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
    console.log(req.method);
    if (req.method === 'POST') {
        const {title, image, address, description} = req.body;
        try {
            if (!title || !image || !address || !description) {
                res.status(422).json({ message: 'Invalid input!' });
                return;
            }
            const client = await MongoClient.connect('mongodb+srv://abdelrahmankasem7:8bmr6su4@cluster0.job85.mongodb.net/meetups');
            const db = client.db();
            const meetupsCollection = db.collection('meetups');
            const result = await meetupsCollection.insertOne({ title, image, address, description });
            client.close();
            res.status(201).json({ message: 'Meetup inserted!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Meetup insertion failed!'});
        }
    }
}

export default handler;