"use strict";

const DODECAHEDRON_NEIGHBORS = {
    'face-00': ['face-00', 'face-05', 'face-15', 'face-20', 'face-40', 'face-55'],
    'face-05': ['face-00', 'face-05', 'face-10', 'face-15', 'face-50', 'face-55'],
    'face-10': ['face-05', 'face-10', 'face-15', 'face-25', 'face-30', 'face-50'],
    'face-15': ['face-00', 'face-05', 'face-10', 'face-15', 'face-20', 'face-25'],
    'face-20': ['face-00', 'face-15', 'face-20', 'face-25', 'face-35', 'face-40'],
    'face-25': ['face-10', 'face-15', 'face-20', 'face-25', 'face-30', 'face-35'],
    'face-30': ['face-10', 'face-25', 'face-30', 'face-35', 'face-45', 'face-50'],
    'face-35': ['face-20', 'face-25', 'face-30', 'face-35', 'face-40', 'face-45'],
    'face-40': ['face-00', 'face-20', 'face-35', 'face-40', 'face-45', 'face-55'],
    'face-45': ['face-30', 'face-35', 'face-40', 'face-45', 'face-50', 'face-55'],
    'face-50': ['face-05', 'face-10', 'face-30', 'face-45', 'face-50', 'face-55'],
    'face-55': ['face-00', 'face-05', 'face-40', 'face-45', 'face-50', 'face-55']
};

const DODECAHEDRON_INVERSE_TRANSFORMS = {
    'face-00': '',
    'face-05': 'rotateZ(126deg) rotateY(-63.43495deg) rotateZ(54deg)',
    'face-10': 'rotateX(180deg) rotateZ(-90deg) rotateY(-63.43495deg) rotateZ(-162deg)',
    'face-15': 'rotateZ(-90deg) rotateY(-63.43495deg) rotateZ(-18deg)',
    'face-20': 'rotateZ(-18deg) rotateY(-63.43495deg) rotateZ(-90deg)',
    'face-25': 'rotateX(180deg) rotateZ(-162deg) rotateY(-63.43495deg) rotateZ(126deg)',
    'face-30': 'rotateX(180deg)',
    'face-35': 'rotateX(180deg) rotateZ(126deg) rotateY(-63.43495deg) rotateZ(54deg)',
    'face-40': 'rotateZ(-90deg) rotateY(-63.43495deg) rotateZ(-162deg)',
    'face-45': 'rotateX(180deg) rotateZ(-90deg) rotateY(-63.43495deg) rotateZ(-18deg)',
    'face-50': 'rotateX(180deg) rotateZ(-18deg) rotateY(-63.43495deg) rotateZ(-90deg)',
    'face-55': 'rotateZ(-162deg) rotateY(-63.43495deg) rotateZ(126deg)'
};

function dodecahedron_set(elt, value) {
    if (!elt.querySelector('.dodecahedron-outer')) {
        dodecahedron_create(elt, value);
    } else {
        const current_value = parseInt(elt.querySelector('.dodecahedron-outer').getAttribute('value'));
        if (value === current_value) {
            // do nothing
        } else if (value === (current_value + 1) % 60) {
            dodecahedron_update_rotation(elt, value);
        } else {
            dodecahedron_create(elt, value);
        }
    }
}

function dodecahedron_update_faces(elt, value) {
    let current_face;

    for (const mark of elt.querySelectorAll('svg > text')) {
        if (parseInt(mark.innerHTML) === value) {
            mark.classList.add('current');
            current_face = mark.parentElement;
        } else {
            mark.classList.remove('current');
        }
    }

    for (const face of elt.querySelectorAll('svg')) {
        if (DODECAHEDRON_NEIGHBORS[current_face.id].includes(face.id)) {
            face.classList.remove('hidden');
        } else {
            face.classList.add('hidden');
        }
    }

    return current_face;
}

function dodecahedron_update_rotation(elt, value) {
    const current_face = dodecahedron_update_faces(elt, value);
    let transform;
    if (value % 5 > 0) {
        // rotate inside face
        const sign = current_face.classList.contains('reversed') ? '' : '-';
        transform = `rotateZ(${sign}0.2turn)`;
    } else if (['face-00', 'face-15', 'face-20', 'face-35', 'face-40', 'face-55'].includes(current_face.id)) {
        // pivot left
        transform = 'rotate3d(0, -0.7639320225002102, 1, 120deg)';
    } else {
        // pivot right
        transform = 'rotate3d(0, -0.7639320225002102, 1, -120deg)';
    }
    const outer = elt.querySelector('.dodecahedron-outer');
    outer.setAttribute('value', value);
    const rotation = outer.animate({transform: 'translateY(-13.5vw) ' + transform}, 400);
    rotation.onfinish = function() {
        const inner = elt.querySelector('.dodecahedron-inner');
        if (inner) {
            inner.style.transform = transform + getComputedStyle(inner).transform;
            outer.style.transform = 'translateY(-13.5vw)';
        }
    };
}

function dodecahedron_create(elt, value) {
    const face = Math.trunc(value / 5) * 5;

    elt.innerHTML = `
        <div class="dodecahedron-outer" value=${value}>
        <div class="dodecahedron-inner">
            <svg class="pentagon reversed hidden" id="face-00" viewBox="-122 -104 244 232" width="244" height="232"
                style="transform: translateZ(-10.712vw);">
                <path d="M0,126L120,39L74,-102L-74,-102L-120,39Z" />
                <text class="pentagon-number-0">00</text>
                <text class="pentagon-number-1">01</text>
                <text class="pentagon-number-2">02</text>
                <text class="pentagon-number-3">03</text>
                <text class="pentagon-number-4">04</text>
            </svg>
            <svg class="pentagon hidden" id="face-05" viewBox="-122 -104 244 232" width="244" height="232"
                style="transform: rotateZ(-54deg) rotateY(63.43495deg) rotateZ(-126deg) translateZ(-10.712vw);">
                <path d="M0,126L120,39L74,-102L-74,-102L-120,39Z" />
                <text class="pentagon-number-0">05</text>
                <text class="pentagon-number-1">06</text>
                <text class="pentagon-number-2">07</text>
                <text class="pentagon-number-3">08</text>
                <text class="pentagon-number-4">09</text>
            </svg>
            <svg class="pentagon hidden" id="face-10" viewBox="-122 -104 244 232" width="244" height="232"
                style="transform: rotateZ(162deg) rotateY(63.43495deg) rotateZ(90deg) rotateX(180deg) translateZ(-10.712vw);">
                <path d="M0,126L120,39L74,-102L-74,-102L-120,39Z" />
                <text class="pentagon-number-0">10</text>
                <text class="pentagon-number-1">11</text>
                <text class="pentagon-number-2">12</text>
                <text class="pentagon-number-3">13</text>
                <text class="pentagon-number-4">14</text>
            </svg>
            <svg class="pentagon reversed hidden" id="face-15" viewBox="-122 -104 244 232" width="244" height="232"
                style="transform: rotateZ(18deg) rotateY(63.43495deg) rotateZ(90deg) translateZ(-10.712vw);">
                <path d="M0,126L120,39L74,-102L-74,-102L-120,39Z" />
                <text class="pentagon-number-0">15</text>
                <text class="pentagon-number-1">16</text>
                <text class="pentagon-number-2">17</text>
                <text class="pentagon-number-3">18</text>
                <text class="pentagon-number-4">19</text>
            </svg>
            <svg class="pentagon reversed hidden" id="face-20" viewBox="-122 -104 244 232" width="244" height="232"
                style="transform: rotateZ(90deg) rotateY(63.43495deg) rotateZ(18deg) translateZ(-10.712vw);">
                <path d="M0,126L120,39L74,-102L-74,-102L-120,39Z" />
                <text class="pentagon-number-0">20</text>
                <text class="pentagon-number-1">21</text>
                <text class="pentagon-number-2">22</text>
                <text class="pentagon-number-3">23</text>
                <text class="pentagon-number-4">24</text>
            </svg>
            <svg class="pentagon hidden" id="face-25" viewBox="-122 -104 244 232" width="244" height="232"
                style="transform: rotateZ(-126deg) rotateY(63.43495deg) rotateZ(162deg) rotateX(180deg) translateZ(-10.712vw);">
                <path d="M0,126L120,39L74,-102L-74,-102L-120,39Z" />
                <text class="pentagon-number-0">25</text>
                <text class="pentagon-number-1">26</text>
                <text class="pentagon-number-2">27</text>
                <text class="pentagon-number-3">28</text>
                <text class="pentagon-number-4">29</text>
            </svg>
            <svg class="pentagon hidden" id="face-30" viewBox="-122 -104 244 232" width="244" height="232"
                style="transform: rotateX(180deg) translateZ(-10.712vw);">
                <path d="M0,126L120,39L74,-102L-74,-102L-120,39Z" />
                <text class="pentagon-number-0">30</text>
                <text class="pentagon-number-1">31</text>
                <text class="pentagon-number-2">32</text>
                <text class="pentagon-number-3">33</text>
                <text class="pentagon-number-4">34</text>
            </svg>
            <svg class="pentagon reversed hidden" id="face-35" viewBox="-122 -104 244 232" width="244" height="232"
                style="transform: rotateZ(-54deg) rotateY(63.43495deg) rotateZ(-126deg) rotateX(180deg) translateZ(-10.712vw);">
                <path d="M0,126L120,39L74,-102L-74,-102L-120,39Z" />
                <text class="pentagon-number-0">35</text>
                <text class="pentagon-number-1">36</text>
                <text class="pentagon-number-2">37</text>
                <text class="pentagon-number-3">38</text>
                <text class="pentagon-number-4">39</text>
            </svg>
            <svg class="pentagon reversed hidden" id="face-40" viewBox="-122 -104 244 232" width="244" height="232"
                style="transform: rotateZ(162deg) rotateY(63.43495deg) rotateZ(90deg) translateZ(-10.712vw);">
                <path d="M0,126L120,39L74,-102L-74,-102L-120,39Z" />
                <text class="pentagon-number-0">40</text>
                <text class="pentagon-number-1">41</text>
                <text class="pentagon-number-2">42</text>
                <text class="pentagon-number-3">43</text>
                <text class="pentagon-number-4">44</text>
            </svg>
            <svg class="pentagon hidden" id="face-45" viewBox="-122 -104 244 232" width="244" height="232"
                style="transform: rotateZ(18deg) rotateY(63.43495deg) rotateZ(90deg) rotateX(180deg) translateZ(-10.712vw);">
                <path d="M0,126L120,39L74,-102L-74,-102L-120,39Z" />
                <text class="pentagon-number-0">45</text>
                <text class="pentagon-number-1">46</text>
                <text class="pentagon-number-2">47</text>
                <text class="pentagon-number-3">48</text>
                <text class="pentagon-number-4">49</text>
            </svg>
            <svg class="pentagon hidden" id="face-50" viewBox="-122 -104 244 232" width="244" height="232"
                style="transform: rotateZ(90deg) rotateY(63.43495deg) rotateZ(18deg) rotateX(180deg) translateZ(-10.712vw);">
                <path d="M0,126L120,39L74,-102L-74,-102L-120,39Z" />
                <text class="pentagon-number-0">50</text>
                <text class="pentagon-number-1">51</text>
                <text class="pentagon-number-2">52</text>
                <text class="pentagon-number-3">53</text>
                <text class="pentagon-number-4">54</text>
            </svg>
            <svg class="pentagon reversed hidden" id="face-55" viewBox="-122 -104 244 232" width="244" height="232"
                style="transform: rotateZ(-126deg) rotateY(63.43495deg) rotateZ(162deg) translateZ(-10.712vw);">
                <path d="M0,126L120,39L74,-102L-74,-102L-120,39Z" />
                <text class="pentagon-number-0">55</text>
                <text class="pentagon-number-1">56</text>
                <text class="pentagon-number-2">57</text>
                <text class="pentagon-number-3">58</text>
                <text class="pentagon-number-4">59</text>
            </svg>
        </div>
        </div>
    `;

    const current_face = dodecahedron_update_faces(elt, value);
    const sign = current_face.classList.contains('reversed') ? '' : '-';
    const angle = sign + (value % 5 / 5) + 'turn';
    elt.querySelector('.dodecahedron-outer').style.transform = 'translateY(-13.5vw)';
    elt.querySelector('.dodecahedron-inner').style.transform =
        `rotateZ(${angle}) ` + DODECAHEDRON_INVERSE_TRANSFORMS[current_face.id];
}
