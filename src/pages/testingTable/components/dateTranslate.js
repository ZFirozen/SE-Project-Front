export function dateSend(orig) {
    return orig
    const dict = {
        year: orig.substr(0, 4),
        month: orig.substr(5, 2),
        day: orig.substr(8, 2)
    };
    return dict
}

export function dateReceived(orig) {
    return orig
    if (orig.year == '' || orig.month == '' || orig.day == '') {
        return ''
    }
    return orig.year + '-' + orig.month + '-' + orig.day + 'T00:00:00Z'
}