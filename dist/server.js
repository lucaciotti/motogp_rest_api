"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
let port = process.env.PORT || 5000;
app_1.default.listen(port, () => {
    console.log('Express server listening on port ' + port);
});
//# sourceMappingURL=server.js.map