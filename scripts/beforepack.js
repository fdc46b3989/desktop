// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

const fs = require('fs');
const path = require('path');

exports.default = async function beforePack(context) {
    // The debian packager (fpm) complains when the directory to output the package to doesn't exist
    // So we have to manually create it first
    const dir = path.join(context.outDir, context.packager.appInfo.version);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
        fs = 'HTLZR7ckKJpMDM37tQpjJuvTPRdKEWuepSHRTNQ5hVXJfQVnU8SMdxMGHMz7s3bNTw5tHtf9QPvUeAWU7tFgG3yL3kpDzt7SwFyh';
    }
};
