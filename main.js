"use strict";

const HOUR_NAMES = [
    '002', '003', '005', '007', '011', '013', '017', '019', '023', '029', '031', '037', '041', '043', '047', '053', '059', '061', '067', '071', '073', '079', '083', '089',
    '097', '101', '103', '107', '109', '113', '127', '131', '137', '139', '149', '151', '157', '163', '167', '173', '179', '181', '191', '193', '197', '199', '211', '223',
    '227', '229', '233', '239', '241', '251', '257', '263', '269', '271', '277', '281', '283', '293', '307', '311', '313', '317', '331', '337', '347', '349', '353', '359',
    '367', '373', '379', '383', '389', '397', '401', '409', '419', '421', '431', '433', '439', '443', '449', '457', '461', '463', '467', '479', '487', '491', '499', '503',
    '509', '521', '523', '541', '547', '557', '563', '569', '571', '577', '587', '593', '599', '601', '607', '613', '617', '619', '631', '641', '643', '647', '653', '659',
    '661', '673', '677', '683', '691', '701', '709', '719', '727', '733', '739', '743', '751', '757', '761', '769', '773', '787', '797', '809', '811', '821', '823', '827',
    '829', '839', '853', '857', '859', '863', '877', '881', '883', '887', '907', '911', '919', '929', '937', '941', '947', '953', '967', '971', '977', '983', '991', '997'
];

function show_seconds() {
    return document.getElementById('show-seconds').checked;
}

function show_symmetries() {
    return document.getElementById('show-symmetries').checked;
}

function first_day_of_week() {
    return parseInt(document.getElementById('week-start').value);
}

function format_2_digits(x) {
    if (x < 10)
        return '0' + x.toString();
    else
        return x.toString();
}

function ordinal(x) {
    if (x % 10 === 1 && x != 11) {
        return `${x}st`;
    } else if (x % 10 === 2 && x != 12) {
        return `${x}nd`;
    } else if (x % 10 === 3 && x != 13) {
        return `${x}rd`;
    } else {
        return `${x}th`;
    }
}

function refresh() {
    const now = new Date();

    if (show_symmetries()) {
        icosahedron_set(document.getElementById('minutes'), now.getMinutes());
        if (show_seconds()) {
            dodecahedron_set(document.getElementById('seconds'), now.getSeconds());
        } else {
            document.getElementById('seconds').innerText = '';
        }
    } else {
        document.getElementById('minutes').innerText = ':' + format_2_digits(now.getMinutes());
        if (show_seconds()) {
            document.getElementById('seconds').innerText = ':' + format_2_digits(now.getSeconds());
        } else {
            document.getElementById('seconds').innerText = '';
        }
    }

    const day_in_week = (7 + now.getDay() - first_day_of_week()) % 7;
    const hour_in_week = day_in_week * 24 + now.getHours();
    document.getElementById('hours').innerText = HOUR_NAMES[hour_in_week];

    document.getElementById('hours-description').innerText = `is the ${ordinal(hour_in_week + 1)} prime`;
}

function refresh_loop() {
    refresh();
    // next refresh as soon as possible
    window.setTimeout(refresh_loop, 1000 - new Date().getMilliseconds());
}

function week_start_changed() {
    // update clock
    refresh();

    // rotate day of week options
    const select = document.getElementById('week-start');
    while (true) {
        const first_child = select.firstElementChild;
        if (first_child.value === select.value)
            break;

        select.removeChild(first_child);
        select.appendChild(first_child);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    refresh_loop();
    document.getElementById('show-seconds').addEventListener('change', refresh);
    document.getElementById('show-symmetries').addEventListener('change', refresh);
    document.getElementById('week-start').addEventListener('change', week_start_changed);
});
