import dotenv from 'dotenv';
import connectDB from './configs/db.config';
import app from './app';

dotenv.config();

const port = process.env.PORT || 3000;

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
