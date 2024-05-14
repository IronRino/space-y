export class Client {
    /**
     * Должен возвращать имя пользователя или null
     * если пользователь не залогинен
     *
     * @return {Promise<string | null>} username
     * */
    async getUser() {
        const response = await fetch('/api/getUser');
        const body = await response.json();
        return body.user || null;
    }

    /**
     * Должен логинить пользователя с именем username
     * и возвращать его имя
     *
     * @param {string} username
     * @return {Promise<string | null>} username
     * */
    async loginUser(username) {
        const input = {user: username};
        const response = await fetch('/api/loginUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        });
        const responseJson = await response.json();
        return responseJson.user;
    }

    /**
     * Должен разлогинивать текущего пользователя
     *
     * @return {void}
     * */
    async logoutUser() {
        return fetch('/api/logoutUser', {method: 'POST'});
    }

    /**
     * Должен возвращать информацию о компании
     *
     * @typedef {Object} Headquarters
     * @property {string} address
     * @property {string} city
     * @property {string} state
     *
     * @typedef {Object} About
     * @property {string} founder
     * @property {string} founded
     * @property {number} employees
     * @property {string} ceo
     * @property {string} coo
     * @property {string} cto
     * @property {number} valuation
     * @property {Headquarters} headquarters
     * @property {string} summary
     * @return {Promise<About>}
     * */
    async getInfo() {
        const response = await fetch("https://api.spacexdata.com/v4/company");
        const data = await response.json();

        const about = {
            founder: data.founder,
            founded: data.founded,
            employees: data.employees,
            ceo: data.ceo,
            coo: data.coo,
            cto: data.cto,
            valuation: data.valuation,
            headquarters: {
                address: data.headquarters.address,
                city: data.headquarters.city,
                state: data.headquarters.state
            },
            summary: data.summary
        };

        return about;
    }

    /**
     * Должен возвращать информацию о всех событиях
     *
     * @typedef {Object} EventBrief
     * @property {number} id
     * @property {string} title
     *
     * @return {Promise<EventBrief[]>}
     * */
    async getHistory() {
        const response = await fetch("https://api.spacexdata.com/v4/history");
        const data = await response.json();

        const events = data.map(event => ({
            id: event.id,
            title: event.title
        }));

        return events;
    }

    /**
     * Должен возвращать информацию о запрошенном событии
     *
     * @typedef {Object} EventFull
     * @property {number} id
     * @property {string} title
     * @property {string} event_date_utc
     * @property {string} details
     * @property {Object.<string, ?string>} links
     *
     * @param {number} id
     * @return {Promise<EventFull>}
     * */
    async getHistoryEvent(id) {
        const response = await fetch(`https://api.spacexdata.com/v4/history/${id}`);
        const data = await response.json();

        const event = {
            id: data.id,
            title: data.title,
            event_date_utc: data.event_date_utc,
            details: data.details,
            links: data.links
        };

        return event;
    }

    /**
     * Должен возвращать информацию о всех ракетах
     *
     * @typedef {Object} RocketBrief
     * @property {number} rocket_id
     * @property {string} rocket_name
     *
     * @return {Promise<RocketBrief[]>}
     * */
    async getRockets() {
        const response = await fetch("https://api.spacexdata.com/v4/rockets");
        const data = await response.json();

        const rockets = data.map(rocket => ({
            rocket_id: rocket.id,
            rocket_name: rocket.name
        }));

        return rockets;
    }

    /**
     * Должен возвращать информацию о запрошенной ракете
     *
     * @typedef {Object} RocketFull
     * @property {number} rocket_id
     * @property {string} rocket_name
     * @property {string} first_flight
     * @property {string} description
     * @property {string} wikipedia
     * @property {string[]} flickr_images
     * Смотри источник данных:
     * @property {Object} height
     * @property {Object} diameter
     * @property {Object} mass
     * @property {Object} engines
     * @property {Object} first_stage
     * @property {Object} second_stage
     *
     * @param {string} id
     * @return {Promise<RocketFull>}
     * */
    async getRocket(id) {
        const response = await fetch(`https://api.spacexdata.com/v4/rockets/${id}`);
        const data = await response.json();

        const rocket = {
            rocket_id: data.id,
            rocket_name: data.name,
            first_flight: data.first_flight,
            description: data.description,
            wikipedia: data.wikipedia,
            flickr_images: data.flickr_images,
            height: data.height,
            diameter: data.diameter,
            mass: data.mass,
            engines: data.engines,
            first_stage: data.first_stage,
            second_stage: data.second_stage
        };

        return rocket;
    }

    /**
     * Должен возвращать информацию о машине в космосе
     *
     * @typedef {Object} Roadster
     * @property {string} name
     * @property {string} launch_date_utc
     * @property {string} details
     * @property {number} earth_distance_km
     * @property {number} mars_distance_km
     * @property {string} wikipedia
     *
     * @return {Promise<Roadster>}
     * */
    async getRoadster() {
        const response = await fetch("https://api.spacexdata.com/v4/roadster");
        const data = await response.json();

        const roadster = {
            name: data.name,
            launch_date_utc: data.launch_date_utc,
            details: data.details,
            earth_distance_km: data.earth_distance_km,
            mars_distance_km: data.mars_distance_km,
            wikipedia: data.wikipedia
        };

        return roadster;
    }

    /**
     * Должен возвращать информацию о всех посланных на Марс предметах
     *
     * @typedef {Object} Item
     * @property {!string} id
     * @property {!string} name
     * @property {!string} phone
     * @property {?number} weight
     * @property {?string} color
     * @property {?boolean} important
     *
     * @return {Promise<Item[]>}
     * */
    async getSentToMars() {
        throw new Error("Not implemented");
    }

    /**
     * Должен посылать на марс переданный предмет и
     * возвращать информацию о всех посланных на Марс предметах
     *
     * @typedef {Object} ItemToSend
     * @property {!string} name
     * @property {!string} phone
     * @property {?number} weight
     * @property {?string} color
     * @property {?boolean} important
     *
     * @param {ItemToSend} item
     * @return {Promise<Item[]>}
     * */
    async sendToMars(item) {
        throw new Error("Not implemented");
    }

    /**
     * Должен отменять отправку на марс переданного предмета и
     * возвращать информацию о всех посланных на Марс предметах
     *
     * @param {Item} item
     * @return {Promise<Item[]>}
     * */
    async cancelSendingToMars(item) {
        throw new Error("Not implemented");
    }
}
