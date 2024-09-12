const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const { sql, poolPromise } = require('./db'); // 引入資料庫連接
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// 中間件
app.use(bodyParser.json()); // 解析 JSON 請求
app.use(cors()); // 啟用 CORS

app.use('/comics', express.static(path.join(__dirname, '/comics')));

// 基本路由
app.get('/', (req, res) => {
    res.send('Comic website backend is running');
});

// 獲取漫畫列表的 API
app.get('/comics', async (req, res) => {
    try {

        const page = req.query.page;
        const limit = req.query.limit;
        console.log(`comics!!! page : ${page}, limit : ${limit}`)
        // const pool = await poolPromise;
        // const result = await pool.request().query('SELECT * FROM Comics');
        // res.json(result.recordset); // 返回漫畫列表
        if (page == 1) {
            res.json({
                "totalCount": 20,
                "comics": [
                    {
                        "comicId": 1,
                        "comicName": "111"
                    },
                    {
                        "comicId": 2,
                        "comicName": "222"
                    },
                    {
                        "comicId": 3,
                        "comicName": "333"
                    },
                    {
                        "comicId": 2,
                        "comicName": "222"
                    },
                    {
                        "comicId": 3,
                        "comicName": "333"
                    },
                    {
                        "comicId": 1,
                        "comicName": "111"
                    },
                    {
                        "comicId": 2,
                        "comicName": "222"
                    },
                    {
                        "comicId": 3,
                        "comicName": "333"
                    },
                    {
                        "comicId": 2,
                        "comicName": "222"
                    },
                    {
                        "comicId": 3,
                        "comicName": "333"
                    },
                    {
                        "comicId": 1,
                        "comicName": "111"
                    },
                    {
                        "comicId": 2,
                        "comicName": "222"
                    },
                    {
                        "comicId": 3,
                        "comicName": "333"
                    },
                    {
                        "comicId": 2,
                        "comicName": "222"
                    },
                    {
                        "comicId": 3,
                        "comicName": "333"
                    }
                ]
            })
        } else if (page == 2) {
            res.json({
                "totalCount": 20,
                "comics": [
                    {
                        "comicId": 1,
                        "comicName": "111"
                    },
                    {
                        "comicId": 2,
                        "comicName": "222"
                    },
                    {
                        "comicId": 3,
                        "comicName": "333"
                    },
                    {
                        "comicId": 2,
                        "comicName": "222"
                    },
                    {
                        "comicId": 3,
                        "comicName": "333"
                    }
                ]
            })
        }


    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// 獲取單本漫畫內容的 API
app.get('/comics/:id/cover', async (req, res) => {
    try {
        const comicId = req.params.id;

        console.log("comics with id!!! : ", comicId)

        const coverPath = path.join(__dirname, 'comics', comicId, 'cover.png'); // 假設封面圖檔是 cover.jpg
        console.log("coverPath:", coverPath)
        if (fs.existsSync(coverPath)) {
            console.log("exists")
            res.sendFile(coverPath); // 傳送封面圖檔
        } else {
            res.status(404).send('Cover image not found');
        }
    } catch (err) {
        // res.status(500).send({ message: err.message });
        console.error(err)
    }
});

// 啟動伺服器
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
