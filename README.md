# lasti-nodejs-api

## Deskripsi API
API menggunakan konsep Service-Oriented Architecture.

## Cara Menggunakan API
1. Download dan intall Node Js melalui https://nodejs.org/en/download/
2. Buat file .env yang diisi dengan
```sh
USER_DATABASE_URL = mongodb+srv://umrhkm:User123@lasti-nodejs-api.mkvyp7l.mongodb.net/user?retryWrites=true&w=majority
COURSE_DATABASE_URL = mongodb+srv://umrhkm:User123@lasti-nodejs-api.mkvyp7l.mongodb.net/course?retryWrites=true&w=majority
FINALPROJECT_DATABASE_URL = mongodb+srv://umrhkm:User123@lasti-nodejs-api.mkvyp7l.mongodb.net/finalproject?retryWrites=true&w=majority

TOKEN_SECRET_KEY = d1da8811059f1681de2b6df3fc633623eb45d979ae0af5a57e5d65adce01f0b683c3c7a4b8e3c48dacb6f43412e91478fe7b19ab36ef282682a95e1410994d32

#Jika Database URL Di Atas Error, Gunakan Database URL Berikut (secret key tetap masukkan)
USER_DATABASE URL = mongodb://umrhkm:<password>@ac-lcisod5-shard-00-00.mkvyp7l.mongodb.net:27017,ac-lcisod5-shard-00-01.mkvyp7l.mongodb.net:27017,ac-lcisod5-shard-00-02.mkvyp7l.mongodb.net:27017/user?ssl=true&replicaSet=atlas-44nept-shard-0&authSource=admin&retryWrites=true&w=majority
COURSE_DATABASE URL = mongodb://umrhkm:<password>@ac-lcisod5-shard-00-00.mkvyp7l.mongodb.net:27017,ac-lcisod5-shard-00-01.mkvyp7l.mongodb.net:27017,ac-lcisod5-shard-00-02.mkvyp7l.mongodb.net:27017/course?ssl=true&replicaSet=atlas-44nept-shard-0&authSource=admin&retryWrites=true&w=majority
FINALPROJECT_DATABASE URL = mongodb://umrhkm:<password>@ac-lcisod5-shard-00-00.mkvyp7l.mongodb.net:27017,ac-lcisod5-shard-00-01.mkvyp7l.mongodb.net:27017,ac-lcisod5-shard-00-02.mkvyp7l.mongodb.net:27017/finalproject?ssl=true&replicaSet=atlas-44nept-shard-0&authSource=admin&retryWrites=true&w=majority
```

3. Buka terminal pada folder root repository ini / Gunakan terminal pada VSCode, untuk menginstall package/module dengan
```sh
npm i
```

4. Jalankan server dengan terminal
```sh
npm start
```

5. Gunakan Postman untuk tes API
```sh
localhost:3000/<endpoint>
```

6. Pastikan lakukan sign up terlebih dahulu
Gunakan URL berikut untuk melakukan sign up
```sh
localhost:3000/api/user/signup
```
dan HTTP Method menjadi POST. Selanjutnya, masukkan ke bagian Body -> raw -> ubah Text menjadi JSON. Terakhir, tuliskan payload dengan body berisikian name, email, dan password. 
![image](https://user-images.githubusercontent.com/93817324/203581825-61a21da8-c385-439f-8272-26ed042fdc11.png)

7. Lakukan sign in
Gunakan URL berikut untuk melakukan sign in
```sh
localhost:3000/api/user/signin
```
Sama seperti saat sign up, perbedaannya disini adalah payload yang harus diisi hanyalah email dan password
![image](https://user-images.githubusercontent.com/93817324/203582180-2ee12285-6224-487b-8b04-e2d39b84ce5a.png)

8. Simpan token yang didapat setelah sign in pada Headers dengan key "autentikasi-token" dan value <token yang didapat>
![image](https://user-images.githubusercontent.com/93817324/203582675-cee5cbe3-a797-459a-8645-fa893fb56476.png)

9. Selesai! Silahkan explore api dengan daftar endpoint di bawah


## Daftar Endpoint, HTTP Method, dan Kegunaannya
### User
- Sign Up / Register <br />
Digunakan untuk mendaftar pada layanan <br />
Endpoint: /api/user/signup <br />
HTTP Method: POST <br />
Payload (JSON): {"name" : "<nama>", "email" : "<email>", "password" : "<password>"}
- Sign In / Login <br />
Digunakan untuk masuk ke layanan <br />
Endpoint: /api/user/signin <br />
HTTP Method: POST <br />
Payload (JSON): {"email" : "<email>", "password" : "<password>"}
- Get All User <br />
Digunakan untuk meliuhat daftar seluruh user pada layanan <br />
Endpoint: /api/user/ <br />
HTTP Method: GET <br />
Payload (JSON): -
- Get User By Email <br />
Digunakan untuk meliuhat daftar user berdasarkan email <br />
Endpoint: /api/user/<email dari user yang ingin dicari> <br />
HTTP Method: GET <br />
Payload (JSON): -

### Course
- Create Course <br />
Digunakan untuk membuat course dan secara otomatis course ini akan dimiliki oleh pembuatnya (user yang sedang login) <br />
Endpoint: /api/course/create <br />
HTTP Method: POST <br />
Payload (JSON): {"name" : "<nama>", "category" : "<category>", "description" : "<description>", "cost" : "<cost>"}
- Get All Course <br />
Digunakan untuk mendapatkan semua course yang terdaftar pada layanan <br />
Endpoint: api/course <br />
HTTP Method: GET <br />
Payload (JSON): -
- Get Course By Name <br />
Digunakan untuk mencari course berdasarkan nama <br />
Endpoint: api/course/<nama course yang dicari> <br />
HTTP Method: GET <br />
Payload (JSON): -
- Approve Course <br />
Digunakan oleh staff/admin untuk approve course yang baru dibuat <br />
Endpoint: api/course/approve/<id dari course yang ingin diapprove> <br />
HTTP Method: PUT <br />
Payload (JSON): -
- Delete Course <br />
Digunakan untuk menghapus course jika yang menghapus adalah pemilik course tersebut <br />
Endpoint: api/course/delete/<id course yang ingin didelete> <br />
HTTP Method: DELETE <br />
Payload (JSON): -

### Final Project
- Create Final Project <br />
Digunakan untuk membuat final project untuk suatu course <br />
Endpoint: api/final-project/create <br />
HTTP Method: POST <br />
Payload (JSON): {"name" : "name", "courseID" : "<ID dari course ingin dibuat final projectnya>", "questionCase" : "<Studi kasus/pertanyaan dari Final Project>"}
- Grade Final Project <br />
Digunakan untuk menilai final project jika user memang pembuat final project (sekaligus pemilik course) <br />
Endpoint: api/final-project/grade/<id final project>/<id dari user yang ingin dinilai> <br />
HTTP Method: PUT <br />
Payload (JSON): {"score" : <score>}
- Add Final Project Answer <br />
Digunakan untuk menambahkan jawaban pada final project <br />
Endpoint: api/final-project/answer/add/<id dari final project yang ingin dijawab> <br />
HTTP Method: PUT <br />
Payload (JSON): {"answer" : "<answer>"}
- Get Final Project Answers <br />
Digunakan untuk mendapatkan semua jawaban pada suatu final project <br />
Endpoint : api/final-project/answer/<id dari final project yang ingin dicari semua jawabannya> <br />
HTTP Method: GET <br />
Payload (JSON) : -
- Get Final Project Answer Of A User <br />
Digunakan untuk mendapatkan jawaban seorang user pada suatu final project <br />
Endpoint : api/final-project/answer/<id dari final project>/<id dari user yang ingin dicari jawabannya> <br />
HTTP Method: GET <br />
Payload (JSON) : -
- Get All Final Project <br />
Digunakan untuk mendapatkan seluruh final project yang ada pada layanan <br />
Endpoint: api/final-project/ <br />
Payload (JSON): -
- Get A Final Project <br />
Digunakan untuk mendapatkan salah satu final project berdasarkan idnya <br />
Endpoint: api/final-project/<id final project> <br />
Payload (JSON): -
- Get Final Project By Course ID <br />
Digunakan untuk mendapatkan final project dari suatu course (menggunakan id course) <br />
Endpoint: api/final-project/search-by-course/<id course> <br />
Payload (JSON): -
- Get User's Final Project Score <br />
Digunakan untuk mendapatkan nilai dari seorang user (berdasarkan ID-nya) yang telah mengerjakan final course tertentu dan telah dinilai <br />
Endpoint: api/final-project/score/<id final project>/<id user> <br />
Payload (JSON): -
