import config  from './../config/DBconnect.js';

export const getSource = async (req, res, next) => {
    try {
        const hostname = req.hostname.toLowerCase();
    
        config.hostState.siteName = hostname;
    
        switch (hostname) {
            case "socialaudience.club":
                config.DBcreated.database = "socialaudience";
                break;
    
            case "secretweb.vip":
                config.DBcreated.database = "tesafollowers";
                break;
    
            case "socialmedia.24s.club":
                config.DBcreated.database = "socialmedia";
                break;
    
            case "mediasolution.24s.club":
                config.DBcreated.database = "mediasolution";
                break;
    
            case "medialab.24s.club":
                config.DBcreated.database = "medialab";
                break;
    
            case "buyfollowers.24s.club":
                config.DBcreated.database = "buyFollowers";
                break;
    
            case "getfollowers.24s.club":
                config.DBcreated.database = "getfollowers";
                break;
    
            case "growfollowers.24s.club":
                config.DBcreated.database = "growfollowers";
                break;
        
            default:
                config.DBcreated.database = "smmperfect";
                // config.DBcreated.database = "tesafollowers";
                break;
        }

    } catch (error) {
        return res.status(500).json({
            error: {
                message: error.message,
            },
            msg: "server error on init."
        });
    }
    
    next();
}

export const get404 = (req, res, next) => {
    const error = new Error(" Not Found.");
    error.statusCode = 404;
    next(error);
}

export const get500 = (error, req, res, next) => {
    const data = error.data;

    return res.status(error.statusCode || 500).json({
        error: {
            message: error.message,
            data: data
        }
    });
}
