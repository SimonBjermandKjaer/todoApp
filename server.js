const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, '/dist/my-app/')));
app.get('/*', function(req, res) {
    res.sendFile('index.html', { root: 'dist/my-app/' }
    );
});
app.listen(process.env.PORT || 8000);