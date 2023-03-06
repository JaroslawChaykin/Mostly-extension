export const timeConverter = (UNIX_timestamp) => {
    const date = new Date(UNIX_timestamp);

    if (date.getUTCHours() !== 0) {
        return `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
    } else if (date.getUTCMinutes() !== 0) {
        return `${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
    } else {
        return `${date.getUTCSeconds()}`;
    }
};

export const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}:${month}:${year}`;
};

export const reduceAllSitesTime = (sites) => {
    return sites.reduce((acc, site) => {
        acc = acc + site.time
        return acc
    }, 0)
}

export const calculateDateFromAllTime = (UNIX_timestamp) => {
    const date = new Date(UNIX_timestamp);

    console.log(date.getUTCMinutes());

    return {
        days: date.getUTCDate() - 1,
        months: date.getUTCMonth(),
        month: date.getUTCMonth(),
        minutes: date.getUTCMinutes(),
        hours: date.getUTCHours(),
        seconds: date.getUTCSeconds(),
    }
}
