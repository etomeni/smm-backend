import { serviceModel } from "./../util/services.model.js"


export class services {
    
    static async getSpecificService(services) {
        try {
            const servicesResult = await serviceModel.find({[services.tbColomb]: services.value });
            if (servicesResult) {
                return servicesResult;
            } else {
                return {
                    message: "Unable to get services.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get services.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     `SELECT * FROM services WHERE ${services.tbColomb} = ?`,
        //     [services.value]
        // );
    };

    static async getServiceByID(serviceID) {
        try {
            const servicesResult = await serviceModel.find({serviceID: serviceID });
            if (servicesResult) {
                return servicesResult;
            } else {
                return {
                    message: "Unable to get services.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get services.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     `SELECT * FROM services WHERE serviceID = ?`,
        //     [`${serviceID}`]
        // );
    };

    static async getAllServices() {
        try {
            const allService = await serviceModel.find({});
            if (allService) {
                return allService;
            } else {
                return {
                    message: "Unable to get services.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get services.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'SELECT * FROM services WHERE 1;'
        // );
    };

    static async deleteService(services) {
        try {
            const result = await serviceModel.deleteOne({ [services.key]: services.keyValue });
            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to get services.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get services.",
                status: false,
                error
            }
        }


        // return db.execute(
        //     `DELETE FROM services WHERE (${services.key}) = ${services.keyValue}`,
        //     [ services.value ]
        // )
    };

    static async deleteServiceByID(serviceID) {
        try {
            const result = await serviceModel.deleteOne({ serviceID: serviceID });
            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to get services.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get services.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     `DELETE FROM services WHERE services.serviceID = ?;`,
        //     [ serviceID ]
        // );
    };

    static async updateService(services) {
        try {
            const result = await serviceModel.updateOne({ [services.key]: services.keyValue }, { $set: { [services.name]: services.value } });
            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to update services.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to update services.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     `UPDATE services SET ${services.name} = ? WHERE ${services.key} = ?;`,
        //     [ services.value, services.keyValue ]
        // );
    };

    static async addService(services) {
        try {
            const newService = new serviceModel({
                serviceID: services.serviceID,
                serviceProvider: services.serviceProvider,
                serviceCategory: services.serviceCategory,
                serviceType: services.serviceType,
                providerRate: services.providerRate,
                resellRate: services.resellRate,
                minOrder: services.minOrder,
                maxOrder: services.maxOrder,
                description: services.description
            });
    
            const result = await newService.save();
            if (result) {
                return result;
            } else {
                return {
                    message: "Error adding new service.",
                    status: false
                }
            }
        } catch (error) {
            return {
                message: "Error adding new service.",
                status: false,
                error
            }
        }


        // return db.execute(
        //     'INSERT INTO services (serviceID, serviceProvider, serviceCategory, serviceType, providerRate, resellRate, minOrder, maxOrder, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        //     [ 
        //         services.serviceID, 
        //         services.serviceProvider, 
        //         services.serviceCategory, 
        //         services.serviceType, 
        //         services.providerRate, 
        //         services.resellRate, 
        //         services.minOrder, 
        //         services.maxOrder, 
        //         services.description, 
        //         // services.updatedAt, 
        //         // services.updatedAt 
        //     ]
        // );
    };



    static updateMultipleServices(services) {
        const db = this.dbConnect();

        let sqlText = this.multipleUpdate(services, 'OR', 'services');

        return db.execute(
            `${sqlText}`,
            services.NewColombNameValue
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