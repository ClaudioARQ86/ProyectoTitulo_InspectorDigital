const fs = require('fs');
const path = require('path');

const listDir = (dirPath) => {
    try {
        return fs.readdirSync(dirPath).map(file => {
            const fullPath = path.join(dirPath, file);
            try {
                const stats = fs.statSync(fullPath);
                return {
                    name: file,
                    type: stats.isDirectory() ? 'dir' : 'file',
                    size: stats.size
                };
            } catch (e) {
                return { name: file, error: e.message };
            }
        });
    } catch (e) {
        return { error: e.message };
    }
};

const debugRoutes = (req, res) => {
    const cwd = process.cwd();
    const dirname = __dirname;
    
    // Check specific paths
    const publicPath = path.join(cwd, 'public');
    const viewsPath = path.join(cwd, 'views');
    const jsPath = path.join(cwd, 'public', 'js');
    
    const info = {
        scan_time: new Date().toISOString(),
        environment: {
            NODE_ENV: process.env.NODE_ENV,
            VERCEL: process.env.VERCEL,
            cwd: cwd,
            dirname: dirname
        },
        paths: {
            public: {
                path: publicPath,
                exists: fs.existsSync(publicPath),
                contents: fs.existsSync(publicPath) ? listDir(publicPath) : null
            },
            views: {
                path: viewsPath,
                exists: fs.existsSync(viewsPath),
                contents: fs.existsSync(viewsPath) ? listDir(viewsPath) : null
            },
            js: {
                path: jsPath,
                exists: fs.existsSync(jsPath),
                contents: fs.existsSync(jsPath) ? listDir(jsPath) : null
            }
        }
    };
    
    res.json(info);
};

module.exports = debugRoutes;
