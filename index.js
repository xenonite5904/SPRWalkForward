const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // สำหรับการอ่าน JSON ใน request body

let gpsData = {
    Lat: null,
    Long: null
};

// รับข้อมูล Latitude และ Longitude ผ่าน POST request
app.post('/LatLong', (req, res) => {
    const { Lat, Long } = req.body;

    if (Lat && Long) {
        gpsData.Lat = Lat;
        gpsData.Long = Long;
        res.status(201).send(`Received Latitude: ${Lat}, Longitude: ${Long}`);
    } else {
        res.status(400).send('Invalid data received');
    }
});

// Route สำหรับดูค่าปัจจุบันของข้อมูลทั้งหมด
app.get('/data', (req, res) => {
    res.json(gpsData);
});

// Route พื้นฐาน สำหรับส่งไฟล์ index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
