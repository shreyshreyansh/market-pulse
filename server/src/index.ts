import dotenv from 'dotenv';
import connectDB from './configs/db.config';
import app from './app';
import cors from 'cors';

dotenv.config();

const port = process.env.PORT || 3400;

connectDB();

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
