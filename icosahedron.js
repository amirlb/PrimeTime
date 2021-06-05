"use strict";

const ICOSAHEDRON_NEIGHBORS = {
    'face-00': ['face-00', 'face-03', 'face-06', 'face-27', 'face-30', 'face-33', 'face-36', 'face-51', 'face-54', 'face-57'],
    'face-03': ['face-00', 'face-03', 'face-06', 'face-09', 'face-27', 'face-30', 'face-48', 'face-51', 'face-54', 'face-57'],
    'face-06': ['face-00', 'face-03', 'face-06', 'face-09', 'face-12', 'face-24', 'face-27', 'face-30', 'face-48', 'face-51'],
    'face-09': ['face-03', 'face-06', 'face-09', 'face-12', 'face-15', 'face-24', 'face-27', 'face-45', 'face-48', 'face-51'],
    'face-12': ['face-06', 'face-09', 'face-12', 'face-15', 'face-18', 'face-21', 'face-24', 'face-27', 'face-45', 'face-48'],
    'face-15': ['face-09', 'face-12', 'face-15', 'face-18', 'face-21', 'face-24', 'face-39', 'face-42', 'face-45', 'face-48'],
    'face-18': ['face-12', 'face-15', 'face-18', 'face-21', 'face-24', 'face-33', 'face-36', 'face-39', 'face-42', 'face-45'],
    'face-21': ['face-12', 'face-15', 'face-18', 'face-21', 'face-24', 'face-27', 'face-30', 'face-33', 'face-36', 'face-39'],
    'face-24': ['face-06', 'face-09', 'face-12', 'face-15', 'face-18', 'face-21', 'face-24', 'face-27', 'face-30', 'face-33'],
    'face-27': ['face-00', 'face-03', 'face-06', 'face-09', 'face-12', 'face-21', 'face-24', 'face-27', 'face-30', 'face-33'],
    'face-30': ['face-00', 'face-03', 'face-06', 'face-21', 'face-24', 'face-27', 'face-30', 'face-33', 'face-36', 'face-57'],
    'face-33': ['face-00', 'face-18', 'face-21', 'face-24', 'face-27', 'face-30', 'face-33', 'face-36', 'face-39', 'face-57'],
    'face-36': ['face-00', 'face-18', 'face-21', 'face-30', 'face-33', 'face-36', 'face-39', 'face-42', 'face-54', 'face-57'],
    'face-39': ['face-15', 'face-18', 'face-21', 'face-33', 'face-36', 'face-39', 'face-42', 'face-45', 'face-54', 'face-57'],
    'face-42': ['face-15', 'face-18', 'face-36', 'face-39', 'face-42', 'face-45', 'face-48', 'face-51', 'face-54', 'face-57'],
    'face-45': ['face-09', 'face-12', 'face-15', 'face-18', 'face-39', 'face-42', 'face-45', 'face-48', 'face-51', 'face-54'],
    'face-48': ['face-03', 'face-06', 'face-09', 'face-12', 'face-15', 'face-42', 'face-45', 'face-48', 'face-51', 'face-54'],
    'face-51': ['face-00', 'face-03', 'face-06', 'face-09', 'face-42', 'face-45', 'face-48', 'face-51', 'face-54', 'face-57'],
    'face-54': ['face-00', 'face-03', 'face-36', 'face-39', 'face-42', 'face-45', 'face-48', 'face-51', 'face-54', 'face-57'],
    'face-57': ['face-00', 'face-03', 'face-30', 'face-33', 'face-36', 'face-39', 'face-42', 'face-51', 'face-54', 'face-57']
};

const ICOSAHEDRON_INVERSE_TRANSFORMS = {
    'face-00': '',
    'face-03': 'rotateZ(-150deg) rotateY(41.810315deg) rotateZ(-30deg)',
    'face-06': 'rotateZ(-30deg) rotateY(41.810315deg) rotateZ(60deg) rotateY(41.810315deg) rotateZ(-30deg)',
    'face-09': 'rotateX(180deg) rotateZ(-150deg) rotateY(41.810315deg) rotateZ(-60deg) rotateY(41.810315deg) rotateZ(-150deg)',
    'face-12': 'rotateX(180deg) rotateZ(-30deg) rotateY(41.810315deg) rotateZ(-150deg)',
    'face-15': 'rotateX(180deg)',
    'face-18': 'rotateX(180deg) rotateZ(-150deg) rotateY(41.810315deg) rotateZ(-30deg)',
    'face-21': 'rotateX(180deg) rotateZ(60deg) rotateX(41.810315deg) rotateZ(-150deg) rotateY(41.810315deg) rotateZ(-30deg)',
    'face-24': 'rotateX(180deg) rotateZ(90deg) rotateY(41.810315deg) rotateZ(60deg) rotateY(41.810315deg) rotateZ(-150deg)',
    'face-27': 'rotateZ(90deg) rotateY(41.810315deg) rotateZ(30deg) rotateX(41.810315deg)',
    'face-30': 'rotateZ(180deg) rotateX(41.810315deg)',
    'face-33': 'rotateZ(-150deg) rotateY(41.810315deg) rotateZ(150deg) rotateX(41.810315deg)',
    'face-36': 'rotateZ(90deg) rotateY(41.810315deg) rotateZ(-60deg) rotateY(41.810315deg) rotateZ(-150deg)',
    'face-39': 'rotateX(180deg) rotateZ(90deg) rotateY(41.810315deg) rotateZ(60deg) rotateY(41.810315deg) rotateZ(-30deg)',
    'face-42': 'rotateX(180deg) rotateZ(-30deg) rotateY(41.810315deg) rotateZ(30deg) rotateX(41.810315deg)',
    'face-45': 'rotateX(180deg) rotateZ(180deg) rotateX(41.810315deg)',
    'face-48': 'rotateX(180deg) rotateZ(-150deg) rotateY(41.810315deg) rotateZ(150deg) rotateX(41.810315deg)',
    'face-51': 'rotateZ(180deg) rotateX(41.810315deg) rotateZ(-150deg) rotateY(41.810315deg) rotateZ(-30deg)',
    'face-54': 'rotateZ(-150deg) rotateY(41.810315deg) rotateZ(60deg) rotateY(41.810315deg) rotateZ(-150deg)',
    'face-57': 'rotateZ(90deg) rotateY(41.810315deg) rotateZ(-150deg)'
};

function icosahedron_set(elt, value) {
    if (!elt.querySelector('.icosahedron-outer')) {
        icosahedron_create(elt, value);
    } else {
        const current_value = parseInt(elt.querySelector('.icosahedron-outer').getAttribute('value'));
        if (value === current_value) {
            // do nothing
        } else if (value === (current_value + 1) % 60) {
            icosahedron_update_rotation(elt, value);
        } else {
            icosahedron_create(elt, value);
        }
    }
}

function icosahedron_update_faces(elt, value) {
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
        if (ICOSAHEDRON_NEIGHBORS[current_face.id].includes(face.id)) {
            face.classList.remove('hidden');
        } else {
            face.classList.add('hidden');
        }
    }

    return current_face;
}

function icosahedron_update_rotation(elt, value) {
    const current_face = icosahedron_update_faces(elt, value);
    let transform;
    if (value % 3 > 0) {
        // rotate inside face
        const sign = current_face.classList.contains('reversed') ? '' : '-';
        transform = `rotateZ(${sign}120deg)`;
    } else if (['face-03', 'face-09', 'face-15', 'face-21', 'face-27', 'face-33', 'face-39', 'face-45', 'face-51', 'face-57'].includes(current_face.id)) {
        // pivot left
        transform = 'rotate3d(0, -0.7639320225002102, 1, 72deg)';
    } else {
        // pivot right
        transform = 'rotate3d(0, -0.7639320225002102, 1, -72deg)';
    }
    const outer = elt.querySelector('.icosahedron-outer');
    outer.setAttribute('value', value);
    const rotation = outer.animate({transform: 'translateY(-11vw) ' + transform}, 400);
    rotation.onfinish = function() {
        const inner = elt.querySelector('.icosahedron-inner');
        if (inner) {
            inner.style.transform = transform + getComputedStyle(inner).transform;
            outer.style.transform = 'translateY(-11vw)';
        }
    };
}

function icosahedron_create(elt, value) {
    const face = Math.trunc(value / 5) * 5;

    elt.innerHTML = `
        <div class="icosahedron-outer" value=${value}>
        <div class="icosahedron-inner">
            <svg class="triangle hidden" id="face-00" viewBox="-188 -99 376 295" width="376" height="295"
                style="transform: translateZ(-10.792272vw);">
                <path d="M0,194L168,-97L-168,-97Z" />
                <text class="triangle-number-0">00</text>
                <text class="triangle-number-1">01</text>
                <text class="triangle-number-2">02</text>
            </svg>
            <svg class="triangle reversed hidden" id="face-03" viewBox="-188 -99 376 295" width="376" height="295"
                style="transform: rotateZ(30deg) rotateY(-41.810315deg) rotateZ(150deg) translateZ(-10.792272vw);">
                <path d="M0,194L168,-97L-168,-97Z" />
                <text class="triangle-number-0">03</text>
                <text class="triangle-number-1">04</text>
                <text class="triangle-number-2">05</text>
            </svg>
            <svg class="triangle hidden" id="face-06" viewBox="-188 -99 376 295" width="376" height="295"
                style="transform: rotateZ(30deg) rotateY(-41.810315deg) rotateZ(-60deg) rotateY(-41.810315deg) rotateZ(30deg) translateZ(-10.792272vw);">
                <path d="M0,194L168,-97L-168,-97Z" />
                <text class="triangle-number-0">06</text>
                <text class="triangle-number-1">07</text>
                <text class="triangle-number-2">08</text>
            </svg>
            <svg class="triangle reversed hidden" id="face-09" viewBox="-188 -99 376 295" width="376" height="295"
                style="transform: rotateZ(150deg) rotateY(-41.810315deg) rotateZ(60deg) rotateY(-41.810315deg) rotateZ(150deg) rotateX(180deg) translateZ(-10.792272vw);">
                <path d="M0,194L168,-97L-168,-97Z" />
                <text class="triangle-number-0">09</text>
                <text class="triangle-number-1">10</text>
                <text class="triangle-number-2">11</text>
            </svg>
            <svg class="triangle hidden" id="face-12" viewBox="-188 -99 376 295" width="376" height="295"
                style="transform: rotateZ(150deg) rotateY(-41.810315deg) rotateZ(30deg) rotateX(180deg) translateZ(-10.792272vw);">
                <path d="M0,194L168,-97L-168,-97Z" />
                <text class="triangle-number-0">12</text>
                <text class="triangle-number-1">13</text>
                <text class="triangle-number-2">14</text>
            </svg>
            <svg class="triangle reversed hidden" id="face-15" viewBox="-188 -99 376 295" width="376" height="295"
                style="transform: rotateX(180deg) translateZ(-10.792272vw);">
                <path d="M0,194L168,-97L-168,-97Z" />
                <text class="triangle-number-0">15</text>
                <text class="triangle-number-1">16</text>
                <text class="triangle-number-2">17</text>
            </svg>
            <svg class="triangle reversed hidden" id="face-18" viewBox="-188 -99 376 295" width="376" height="295"
                style="transform: rotateZ(30deg) rotateY(-41.810315deg) rotateZ(150deg) rotateX(180deg) translateZ(-10.792272vw);">
                <path d="M0,194L168,-97L-168,-97Z" />
                <text class="triangle-number-0">18</text>
                <text class="triangle-number-1">19</text>
                <text class="triangle-number-2">20</text>
            </svg>
            <svg class="triangle reversed hidden" id="face-21" viewBox="-188 -99 376 295" width="376" height="295"
                style="transform: rotateZ(30deg) rotateY(-41.810315deg) rotateZ(150deg) rotateX(-41.810315deg) rotateZ(-60deg) rotateX(180deg) translateZ(-10.792272vw);">
                <path d="M0,194L168,-97L-168,-97Z" />
                <text class="triangle-number-0">21</text>
                <text class="triangle-number-1">22</text>
                <text class="triangle-number-2">23</text>
            </svg>
            <svg class="triangle hidden" id="face-24" viewBox="-188 -99 376 295" width="376" height="295"
                style="transform: rotateZ(150deg) rotateY(-41.810315deg) rotateZ(-60deg) rotateY(-41.810315deg) rotateZ(-90deg) rotateX(180deg) translateZ(-10.792272vw);">
                <path d="M0,194L168,-97L-168,-97Z" />
                <text class="triangle-number-0">24</text>
                <text class="triangle-number-1">25</text>
                <text class="triangle-number-2">26</text>
            </svg>
            <svg class="triangle hidden" id="face-27" viewBox="-188 -99 376 295" width="376" height="295"
                style="transform: rotateX(-41.810315deg) rotateZ(-30deg) rotateY(-41.810315deg) rotateZ(-90deg) translateZ(-10.792272vw);">
                <path d="M0,194L168,-97L-168,-97Z" />
                <text class="triangle-number-0">27</text>
                <text class="triangle-number-1">28</text>
                <text class="triangle-number-2">29</text>
            </svg>
            <svg class="triangle hidden" id="face-30" viewBox="-188 -99 376 295" width="376" height="295"
                style="transform: rotateX(-41.810315deg) rotateZ(180deg) translateZ(-10.792272vw);">
                <path d="M0,194L168,-97L-168,-97Z" />
                <text class="triangle-number-0">30</text>
                <text class="triangle-number-1">31</text>
                <text class="triangle-number-2">32</text>
            </svg>
            <svg class="triangle reversed hidden" id="face-33" viewBox="-188 -99 376 295" width="376" height="295"
                style="transform: rotateX(-41.810315deg) rotateZ(-150deg) rotateY(-41.810315deg) rotateZ(150deg) translateZ(-10.792272vw);">
                <path d="M0,194L168,-97L-168,-97Z" />
                <text class="triangle-number-0">33</text>
                <text class="triangle-number-1">34</text>
                <text class="triangle-number-2">35</text>
            </svg>
            <svg class="triangle hidden" id="face-36" viewBox="-188 -99 376 295" width="376" height="295"
                style="transform: rotateZ(150deg) rotateY(-41.810315deg) rotateZ(60deg) rotateY(-41.810315deg) rotateZ(-90deg) translateZ(-10.792272vw);">
                <path d="M0,194L168,-97L-168,-97Z" />
                <text class="triangle-number-0">36</text>
                <text class="triangle-number-1">37</text>
                <text class="triangle-number-2">38</text>
            </svg>
            <svg class="triangle reversed hidden" id="face-39" viewBox="-188 -99 376 295" width="376" height="295"
                style="transform: rotateZ(30deg) rotateY(-41.810315deg) rotateZ(-60deg) rotateY(-41.810315deg) rotateZ(-90deg) rotateX(180deg) translateZ(-10.792272vw);">
                <path d="M0,194L168,-97L-168,-97Z" />
                <text class="triangle-number-0">39</text>
                <text class="triangle-number-1">40</text>
                <text class="triangle-number-2">41</text>
            </svg>
            <svg class="triangle hidden" id="face-42" viewBox="-188 -99 376 295" width="376" height="295"
                style="transform: rotateX(-41.810315deg) rotateZ(-30deg) rotateY(-41.810315deg) rotateZ(30deg) rotateX(180deg) translateZ(-10.792272vw);">
                <path d="M0,194L168,-97L-168,-97Z" />
                <text class="triangle-number-0">42</text>
                <text class="triangle-number-1">43</text>
                <text class="triangle-number-2">44</text>
            </svg>
            <svg class="triangle reversed hidden" id="face-45" viewBox="-188 -99 376 295" width="376" height="295"
                style="transform: rotateX(-41.810315deg) rotateZ(180deg) rotateX(180deg) translateZ(-10.792272vw);">
                <path d="M0,194L168,-97L-168,-97Z" />
                <text class="triangle-number-0">45</text>
                <text class="triangle-number-1">46</text>
                <text class="triangle-number-2">47</text>
            </svg>
            <svg class="triangle reversed hidden" id="face-48" viewBox="-188 -99 376 295" width="376" height="295"
                style="transform: rotateX(-41.810315deg) rotateZ(-150deg) rotateY(-41.810315deg) rotateZ(150deg) rotateX(180deg) translateZ(-10.792272vw);">
                <path d="M0,194L168,-97L-168,-97Z" />
                <text class="triangle-number-0">48</text>
                <text class="triangle-number-1">49</text>
                <text class="triangle-number-2">50</text>
            </svg>
            <svg class="triangle reversed hidden" id="face-51" viewBox="-188 -99 376 295" width="376" height="295"
                style="transform: rotateZ(30deg) rotateY(-41.810315deg) rotateZ(150deg) rotateX(-41.810315deg) rotateZ(180deg) translateZ(-10.792272vw);">
                <path d="M0,194L168,-97L-168,-97Z" />
                <text class="triangle-number-0">51</text>
                <text class="triangle-number-1">52</text>
                <text class="triangle-number-2">53</text>
            </svg>
            <svg class="triangle hidden" id="face-54" viewBox="-188 -99 376 295" width="376" height="295"
                style="transform: rotateZ(150deg) rotateY(-41.810315deg) rotateZ(-60deg) rotateY(-41.810315deg) rotateZ(150deg) translateZ(-10.792272vw);">
                <path d="M0,194L168,-97L-168,-97Z" />
                <text class="triangle-number-0">54</text>
                <text class="triangle-number-1">55</text>
                <text class="triangle-number-2">56</text>
            </svg>
            <svg class="triangle hidden" id="face-57" viewBox="-188 -99 376 295" width="376" height="295"
                style="transform: rotateZ(150deg) rotateY(-41.810315deg) rotateZ(-90deg) translateZ(-10.792272vw);">
                <path d="M0,194L168,-97L-168,-97Z" />
                <text class="triangle-number-0">57</text>
                <text class="triangle-number-1">58</text>
                <text class="triangle-number-2">59</text>
            </svg>
        </div>
        </div>
    `;

    const current_face = icosahedron_update_faces(elt, value);
    const sign = current_face.classList.contains('reversed') ? '' : '-';
    const angle = sign + (value % 3 * 120) + 'deg';
    elt.querySelector('.icosahedron-outer').style.transform = 'translateY(-11vw)';
    elt.querySelector('.icosahedron-inner').style.transform =
        `rotateZ(${angle}) ` + ICOSAHEDRON_INVERSE_TRANSFORMS[current_face.id];
}
