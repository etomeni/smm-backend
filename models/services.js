import {
    socialaudience, 
    secretweb, 
    socialmedia, 
    mediasolution,
    medialab,
    buyFollowers,
    getfollowers,
    growfollowers,
    pool, 
} from '../util/database.js';

import config  from './../config/DBconnect.js';


export class services {

    static dbConnect() {
        let db = pool.promise();

        if (config.hostState.siteName.includes("24s.club") || config.hostState.siteName == "secretweb.vip") {
            // config.DBcreated.database = "tesafollowers";
            db = secretweb.promise();
        }
    
        if (config.hostState.siteName.includes("socialaudience.club") || config.hostState.siteName == "socialaudience.club") {
            // config.DBcreated.database = "socialaudience";
            db = socialaudience.promise();
        }
    
        if (config.hostState.siteName.includes("localhost") || config.hostState.siteName == "localhost") {
            // config.DBcreated.database = "smmperfect";
            db = pool.promise();
        }

        return db;
    };

    constructor() { }
    
    static getSpecificService(services) {
        const db = this.dbConnect();

        return db.execute(
            `SELECT * FROM services WHERE ${services.tbColomb} = ?`,
            [services.value]
        );
    };

    static getServiceByID(serviceID) {
        const db = this.dbConnect();

        return db.execute(
            `SELECT * FROM services WHERE serviceID = ?`,
            [`${serviceID}`]
        );
    };

    static getAllServices() {
        const db = this.dbConnect();

        return db.execute(
            'SELECT * FROM services WHERE 1;'
        );
    };


    static deleteService(services) {
        const db = this.dbConnect();

        return db.execute(
            `DELETE FROM services WHERE (${services.key}) = ${services.keyValue}`,
            [ services.value ]
        )
    };

    static deleteServiceByID(serviceID) {
        const db = this.dbConnect();

        return db.execute(
            `DELETE FROM services WHERE services.serviceID = ?;`,
            [ serviceID ]
        );
    };

    static updateService(services) {
        const db = this.dbConnect();

        return db.execute(
            `UPDATE services SET ${services.name} = ? WHERE ${services.key} = ?;`,
            [ services.value, services.keyValue ]
        )
    };

    static updateMultipleServices(services) {
        const db = this.dbConnect();

        let sqlText = this.multipleUpdate(services, 'OR', 'services');

        return db.execute(
            `${sqlText}`,
            services.NewColombNameValue
        )
    };

    static addService(services) {
        const db = this.dbConnect();

        return db.execute(
            'INSERT INTO services (serviceID, serviceProvider, serviceCategory, serviceType, providerRate, resellRate, minOrder, maxOrder, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [ 
                services.serviceID, 
                services.serviceProvider, 
                services.serviceCategory, 
                services.serviceType, 
                services.providerRate, 
                services.resellRate, 
                services.minOrder, 
                services.maxOrder, 
                services.description, 
                // services.updatedAt, 
                // services.updatedAt 
            ]
        )
    };




    static multipleUpdate(data, condition, tableName) {
        const db = this.dbConnect();

        let sqlText = `UPDATE ${tableName} SET `

        for (let i = 0; i < data.colombName.length; i++) {
            const element = data.colombName[i];

            if (i === 0) {
                sqlText += `${element} = ?`;
            } else {
                sqlText += `, ${element} = ?`;
            }
        }

        for (let i = 0; i < data.conditionColombName.length; i++) {
            const conditionName = data.conditionColombName[i];
            const elconditionValue = data.conditionColombValue[i];

            if (i === 0) {
                sqlText += ` WHERE ${tableName}.${conditionName} = '${elconditionValue}'`;
            } else {
                sqlText += ` ${condition} ${tableName}.${conditionName} =' ${elconditionValue}'`;
            }
        }

        return sqlText;
    }
}

// // module.exports = class user {
// export class services {

//     constructor() { }

//     static getSpecificService(services) {
//         return db.execute(
//             `SELECT * FROM services WHERE ${services.tbColomb} = ?`,
//             [services.value]
//         );
//     };

//     static getServiceByID(serviceID) {
//         return db.execute(
//             `SELECT * FROM services WHERE serviceID = ?`,
//             [`${serviceID}`]
//         );
//     };

//     static getAllServices() {
//         return db.execute(
//             'SELECT * FROM services WHERE 1;'
//         );
//     };


//     static deleteService(services) {
//         return db.execute(
//             `DELETE FROM services WHERE (${services.key}) = ${services.keyValue}`,
//             [ services.value ]
//         )
//     };

//     static updateService(services) {
//         return db.execute(
//             `UPDATE services SET ${services.name} = ? WHERE ${services.key} = ?;`,
//             [ services.value, services.keyValue ]
//         )
//     };

//     static updateMultipleServices(services) {
//         let sqlText = this.multipleUpdate(services, 'OR', 'services');

//         return db.execute(
//             `${sqlText}`,
//             services.NewColombNameValue
//         )
//     };

//     static addService(services) {
//         return db.execute(
//             'INSERT INTO services (serviceID, serviceProvider, serviceCategory, serviceType, providerRate, resellRate, minOrder, maxOrder, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
//             [ 
//                 services.serviceID, 
//                 services.serviceProvider, 
//                 services.serviceCategory, 
//                 services.serviceType, 
//                 services.providerRate, 
//                 services.resellRate, 
//                 services.minOrder, 
//                 services.maxOrder, 
//                 services.description, 
//                 // services.updatedAt, 
//                 // services.updatedAt 
//             ]
//         )
//     };




//     static multipleUpdate(data, condition, tableName) {
//         let sqlText = `UPDATE ${tableName} SET `

//         for (let i = 0; i < data.colombName.length; i++) {
//             const element = data.colombName[i];

//             if (i === 0) {
//                 sqlText += `${element} = ?`;
//             } else {
//                 sqlText += `, ${element} = ?`;
//             }
//         }

//         for (let i = 0; i < data.conditionColombName.length; i++) {
//             const conditionName = data.conditionColombName[i];
//             const elconditionValue = data.conditionColombValue[i];

//             if (i === 0) {
//                 sqlText += ` WHERE ${tableName}.${conditionName} = '${elconditionValue}'`;
//             } else {
//                 sqlText += ` ${condition} ${tableName}.${conditionName} =' ${elconditionValue}'`;
//             }
//         }

//         return sqlText;
//     }
// }