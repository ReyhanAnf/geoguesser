'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Daftar lengkap negara dan bendera
const countries = [
  { name: 'Afghanistan', code: 'AF', flag: 'https://flagcdn.com/af.svg', region: 'Asia' },
  { name: 'Albania', code: 'AL', flag: 'https://flagcdn.com/al.svg', region: 'Europe' },
  { name: 'Algeria', code: 'DZ', flag: 'https://flagcdn.com/dz.svg', region: 'Africa' },
  { name: 'Andorra', code: 'AD', flag: 'https://flagcdn.com/ad.svg', region: 'Europe' },
  { name: 'Angola', code: 'AO', flag: 'https://flagcdn.com/ao.svg', region: 'Africa' },
  { name: 'Antigua and Barbuda', code: 'AG', flag: 'https://flagcdn.com/ag.svg', region: 'Americas' },
  { name: 'Argentina', code: 'AR', flag: 'https://flagcdn.com/ar.svg', region: 'Americas' },
  { name: 'Armenia', code: 'AM', flag: 'https://flagcdn.com/am.svg', region: 'Asia' },
  { name: 'Australia', code: 'AU', flag: 'https://flagcdn.com/au.svg', region: 'Oceania' },
  { name: 'Austria', code: 'AT', flag: 'https://flagcdn.com/at.svg', region: 'Europe' },
  { name: 'Azerbaijan', code: 'AZ', flag: 'https://flagcdn.com/az.svg', region: 'Asia' },
  { name: 'Bahamas', code: 'BS', flag: 'https://flagcdn.com/bs.svg', region: 'Americas' },
  { name: 'Bahrain', code: 'BH', flag: 'https://flagcdn.com/bh.svg', region: 'Asia' },
  { name: 'Bangladesh', code: 'BD', flag: 'https://flagcdn.com/bd.svg', region: 'Asia' },
  { name: 'Barbados', code: 'BB', flag: 'https://flagcdn.com/bb.svg', region: 'Americas' },
  { name: 'Belarus', code: 'BY', flag: 'https://flagcdn.com/by.svg', region: 'Europe' },
  { name: 'Belgium', code: 'BE', flag: 'https://flagcdn.com/be.svg', region: 'Europe' },
  { name: 'Belize', code: 'BZ', flag: 'https://flagcdn.com/bz.svg', region: 'Americas' },
  { name: 'Benin', code: 'BJ', flag: 'https://flagcdn.com/bj.svg', region: 'Africa' },
  { name: 'Bhutan', code: 'BT', flag: 'https://flagcdn.com/bt.svg', region: 'Asia' },
  { name: 'Bolivia', code: 'BO', flag: 'https://flagcdn.com/bo.svg', region: 'Americas' },
  { name: 'Bosnia and Herzegovina', code: 'BA', flag: 'https://flagcdn.com/ba.svg', region: 'Europe' },
  { name: 'Botswana', code: 'BW', flag: 'https://flagcdn.com/bw.svg', region: 'Africa' },
  { name: 'Brazil', code: 'BR', flag: 'https://flagcdn.com/br.svg', region: 'Americas' },
  { name: 'Brunei', code: 'BN', flag: 'https://flagcdn.com/bn.svg', region: 'Asia' },
  { name: 'Bulgaria', code: 'BG', flag: 'https://flagcdn.com/bg.svg', region: 'Europe' },
  { name: 'Burkina Faso', code: 'BF', flag: 'https://flagcdn.com/bf.svg', region: 'Africa' },
  { name: 'Burundi', code: 'BI', flag: 'https://flagcdn.com/bi.svg', region: 'Africa' },
  { name: 'Cabo Verde', code: 'CV', flag: 'https://flagcdn.com/cv.svg', region: 'Africa' },
  { name: 'Cambodia', code: 'KH', flag: 'https://flagcdn.com/kh.svg', region: 'Asia' },
  { name: 'Cameroon', code: 'CM', flag: 'https://flagcdn.com/cm.svg', region: 'Africa' },
  { name: 'Canada', code: 'CA', flag: 'https://flagcdn.com/ca.svg', region: 'Americas' },
  { name: 'Central African Republic', code: 'CF', flag: 'https://flagcdn.com/cf.svg', region: 'Africa' },
  { name: 'Chad', code: 'TD', flag: 'https://flagcdn.com/td.svg', region: 'Africa' },
  { name: 'Chile', code: 'CL', flag: 'https://flagcdn.com/cl.svg', region: 'Americas' },
  { name: 'China', code: 'CN', flag: 'https://flagcdn.com/cn.svg', region: 'Asia' },
  { name: 'Colombia', code: 'CO', flag: 'https://flagcdn.com/co.svg', region: 'Americas' },
  { name: 'Comoros', code: 'KM', flag: 'https://flagcdn.com/km.svg', region: 'Africa' },
  { name: 'Congo', code: 'CG', flag: 'https://flagcdn.com/cg.svg', region: 'Africa' },
  { name: 'Costa Rica', code: 'CR', flag: 'https://flagcdn.com/cr.svg', region: 'Americas' },
  { name: 'Croatia', code: 'HR', flag: 'https://flagcdn.com/hr.svg', region: 'Europe' },
  { name: 'Cuba', code: 'CU', flag: 'https://flagcdn.com/cu.svg', region: 'Americas' },
  { name: 'Cyprus', code: 'CY', flag: 'https://flagcdn.com/cy.svg', region: 'Europe' },
  { name: 'Czech Republic', code: 'CZ', flag: 'https://flagcdn.com/cz.svg', region: 'Europe' },
  { name: 'Denmark', code: 'DK', flag: 'https://flagcdn.com/dk.svg', region: 'Europe' },
  { name: 'Djibouti', code: 'DJ', flag: 'https://flagcdn.com/dj.svg', region: 'Africa' },
  { name: 'Dominica', code: 'DM', flag: 'https://flagcdn.com/dm.svg', region: 'Americas' },
  { name: 'Dominican Republic', code: 'DO', flag: 'https://flagcdn.com/do.svg', region: 'Americas' },
  { name: 'Ecuador', code: 'EC', flag: 'https://flagcdn.com/ec.svg', region: 'Americas' },
  { name: 'Egypt', code: 'EG', flag: 'https://flagcdn.com/eg.svg', region: 'Africa' },
  { name: 'El Salvador', code: 'SV', flag: 'https://flagcdn.com/sv.svg', region: 'Americas' },
  { name: 'Equatorial Guinea', code: 'GQ', flag: 'https://flagcdn.com/gq.svg', region: 'Africa' },
  { name: 'Eritrea', code: 'ER', flag: 'https://flagcdn.com/er.svg', region: 'Africa' },
  { name: 'Estonia', code: 'EE', flag: 'https://flagcdn.com/ee.svg', region: 'Europe' },
  { name: 'Eswatini', code: 'SZ', flag: 'https://flagcdn.com/sz.svg', region: 'Africa' },
  { name: 'Ethiopia', code: 'ET', flag: 'https://flagcdn.com/et.svg', region: 'Africa' },
  { name: 'Fiji', code: 'FJ', flag: 'https://flagcdn.com/fj.svg', region: 'Oceania' },
  { name: 'Finland', code: 'FI', flag: 'https://flagcdn.com/fi.svg', region: 'Europe' },
  { name: 'France', code: 'FR', flag: 'https://flagcdn.com/fr.svg', region: 'Europe' },
  { name: 'Gabon', code: 'GA', flag: 'https://flagcdn.com/ga.svg', region: 'Africa' },
  { name: 'Gambia', code: 'GM', flag: 'https://flagcdn.com/gm.svg', region: 'Africa' },
  { name: 'Georgia', code: 'GE', flag: 'https://flagcdn.com/ge.svg', region: 'Asia' },
  { name: 'Germany', code: 'DE', flag: 'https://flagcdn.com/de.svg', region: 'Europe' },
  { name: 'Ghana', code: 'GH', flag: 'https://flagcdn.com/gh.svg', region: 'Africa' },
  { name: 'Greece', code: 'GR', flag: 'https://flagcdn.com/gr.svg', region: 'Europe' },
  { name: 'Grenada', code: 'GD', flag: 'https://flagcdn.com/gd.svg', region: 'Americas' },
  { name: 'Guatemala', code: 'GT', flag: 'https://flagcdn.com/gt.svg', region: 'Americas' },
  { name: 'Guinea', code: 'GN', flag: 'https://flagcdn.com/gn.svg', region: 'Africa' },
  { name: 'Guinea-Bissau', code: 'GW', flag: 'https://flagcdn.com/gw.svg', region: 'Africa' },
  { name: 'Guyana', code: 'GY', flag: 'https://flagcdn.com/gy.svg', region: 'Americas' },
  { name: 'Haiti', code: 'HT', flag: 'https://flagcdn.com/ht.svg', region: 'Americas' },
  { name: 'Honduras', code: 'HN', flag: 'https://flagcdn.com/hn.svg', region: 'Americas' },
  { name: 'Hungary', code: 'HU', flag: 'https://flagcdn.com/hu.svg', region: 'Europe' },
  { name: 'Iceland', code: 'IS', flag: 'https://flagcdn.com/is.svg', region: 'Europe' },
  { name: 'India', code: 'IN', flag: 'https://flagcdn.com/in.svg', region: 'Asia' },
  { name: 'Indonesia', code: 'ID', flag: 'https://flagcdn.com/id.svg', region: 'Asia' },
  { name: 'Iran', code: 'IR', flag: 'https://flagcdn.com/ir.svg', region: 'Asia' },
  { name: 'Iraq', code: 'IQ', flag: 'https://flagcdn.com/iq.svg', region: 'Asia' },
  { name: 'Ireland', code: 'IE', flag: 'https://flagcdn.com/ie.svg', region: 'Europe' },
  { name: 'Israel', code: 'IL', flag: 'https://flagcdn.com/il.svg', region: 'Asia' },
  { name: 'Italy', code: 'IT', flag: 'https://flagcdn.com/it.svg', region: 'Europe' },
  { name: 'Jamaica', code: 'JM', flag: 'https://flagcdn.com/jm.svg', region: 'Americas' },
  { name: 'Japan', code: 'JP', flag: 'https://flagcdn.com/jp.svg', region: 'Asia' },
  { name: 'Jordan', code: 'JO', flag: 'https://flagcdn.com/jo.svg', region: 'Asia' },
  { name: 'Kazakhstan', code: 'KZ', flag: 'https://flagcdn.com/kz.svg', region: 'Asia' },
  { name: 'Kenya', code: 'KE', flag: 'https://flagcdn.com/ke.svg', region: 'Africa' },
  { name: 'Kiribati', code: 'KI', flag: 'https://flagcdn.com/ki.svg', region: 'Oceania' },
  { name: 'Kuwait', code: 'KW', flag: 'https://flagcdn.com/kw.svg', region: 'Asia' },
  { name: 'Kyrgyzstan', code: 'KG', flag: 'https://flagcdn.com/kg.svg', region: 'Asia' },
  { name: 'Laos', code: 'LA', flag: 'https://flagcdn.com/la.svg', region: 'Asia' },
  { name: 'Latvia', code: 'LV', flag: 'https://flagcdn.com/lv.svg', region: 'Europe' },
  { name: 'Lebanon', code: 'LB', flag: 'https://flagcdn.com/lb.svg', region: 'Asia' },
  { name: 'Lesotho', code: 'LS', flag: 'https://flagcdn.com/ls.svg', region: 'Africa' },
  { name: 'Liberia', code: 'LR', flag: 'https://flagcdn.com/lr.svg', region: 'Africa' },
  { name: 'Libya', code: 'LY', flag: 'https://flagcdn.com/ly.svg', region: 'Africa' },
  { name: 'Liechtenstein', code: 'LI', flag: 'https://flagcdn.com/li.svg', region: 'Europe' },
  { name: 'Lithuania', code: 'LT', flag: 'https://flagcdn.com/lt.svg', region: 'Europe' },
  { name: 'Luxembourg', code: 'LU', flag: 'https://flagcdn.com/lu.svg', region: 'Europe' },
  { name: 'Madagascar', code: 'MG', flag: 'https://flagcdn.com/mg.svg', region: 'Africa' },
  { name: 'Malawi', code: 'MW', flag: 'https://flagcdn.com/mw.svg', region: 'Africa' },
  { name: 'Malaysia', code: 'MY', flag: 'https://flagcdn.com/my.svg', region: 'Asia' },
  { name: 'Maldives', code: 'MV', flag: 'https://flagcdn.com/mv.svg', region: 'Asia' },
  { name: 'Mali', code: 'ML', flag: 'https://flagcdn.com/ml.svg', region: 'Africa' },
  { name: 'Malta', code: 'MT', flag: 'https://flagcdn.com/mt.svg', region: 'Europe' },
  { name: 'Marshall Islands', code: 'MH', flag: 'https://flagcdn.com/mh.svg', region: 'Oceania' },
  { name: 'Mauritania', code: 'MR', flag: 'https://flagcdn.com/mr.svg', region: 'Africa' },
  { name: 'Mauritius', code: 'MU', flag: 'https://flagcdn.com/mu.svg', region: 'Africa' },
  { name: 'Mexico', code: 'MX', flag: 'https://flagcdn.com/mx.svg', region: 'Americas' },
  { name: 'Micronesia', code: 'FM', flag: 'https://flagcdn.com/fm.svg', region: 'Oceania' },
  { name: 'Moldova', code: 'MD', flag: 'https://flagcdn.com/md.svg', region: 'Europe' },
  { name: 'Monaco', code: 'MC', flag: 'https://flagcdn.com/mc.svg', region: 'Europe' },
  { name: 'Mongolia', code: 'MN', flag: 'https://flagcdn.com/mn.svg', region: 'Asia' },
  { name: 'Montenegro', code: 'ME', flag: 'https://flagcdn.com/me.svg', region: 'Europe' },
  { name: 'Morocco', code: 'MA', flag: 'https://flagcdn.com/ma.svg', region: 'Africa' },
  { name: 'Mozambique', code: 'MZ', flag: 'https://flagcdn.com/mz.svg', region: 'Africa' },
  { name: 'Myanmar', code: 'MM', flag: 'https://flagcdn.com/mm.svg', region: 'Asia' },
  { name: 'Namibia', code: 'NA', flag: 'https://flagcdn.com/na.svg', region: 'Africa' },
  { name: 'Nauru', code: 'NR', flag: 'https://flagcdn.com/nr.svg', region: 'Oceania' },
  { name: 'Nepal', code: 'NP', flag: 'https://flagcdn.com/np.svg', region: 'Asia' },
  { name: 'Netherlands', code: 'NL', flag: 'https://flagcdn.com/nl.svg', region: 'Europe' },
  { name: 'New Zealand', code: 'NZ', flag: 'https://flagcdn.com/nz.svg', region: 'Oceania' },
  { name: 'Nicaragua', code: 'NI', flag: 'https://flagcdn.com/ni.svg', region: 'Americas' },
  { name: 'Niger', code: 'NE', flag: 'https://flagcdn.com/ne.svg', region: 'Africa' },
  { name: 'Nigeria', code: 'NG', flag: 'https://flagcdn.com/ng.svg', region: 'Africa' },
  { name: 'North Korea', code: 'KP', flag: 'https://flagcdn.com/kp.svg', region: 'Asia' },
  { name: 'North Macedonia', code: 'MK', flag: 'https://flagcdn.com/mk.svg', region: 'Europe' },
  { name: 'Norway', code: 'NO', flag: 'https://flagcdn.com/no.svg', region: 'Europe' },
  { name: 'Oman', code: 'OM', flag: 'https://flagcdn.com/om.svg', region: 'Asia' },
  { name: 'Pakistan', code: 'PK', flag: 'https://flagcdn.com/pk.svg', region: 'Asia' },
  { name: 'Palau', code: 'PW', flag: 'https://flagcdn.com/pw.svg', region: 'Oceania' },
  { name: 'Panama', code: 'PA', flag: 'https://flagcdn.com/pa.svg', region: 'Americas' },
  { name: 'Papua New Guinea', code: 'PG', flag: 'https://flagcdn.com/pg.svg', region: 'Oceania' },
  { name: 'Paraguay', code: 'PY', flag: 'https://flagcdn.com/py.svg', region: 'Americas' },
  { name: 'Peru', code: 'PE', flag: 'https://flagcdn.com/pe.svg', region: 'Americas' },
  { name: 'Philippines', code: 'PH', flag: 'https://flagcdn.com/ph.svg', region: 'Asia' },
  { name: 'Poland', code: 'PL', flag: 'https://flagcdn.com/pl.svg', region: 'Europe' },
  { name: 'Portugal', code: 'PT', flag: 'https://flagcdn.com/pt.svg', region: 'Europe' },
  { name: 'Qatar', code: 'QA', flag: 'https://flagcdn.com/qa.svg', region: 'Asia' },
  { name: 'Romania', code: 'RO', flag: 'https://flagcdn.com/ro.svg', region: 'Europe' },
  { name: 'Russia', code: 'RU', flag: 'https://flagcdn.com/ru.svg', region: 'Europe' },
  { name: 'Rwanda', code: 'RW', flag: 'https://flagcdn.com/rw.svg', region: 'Africa' },
  { name: 'Saint Kitts and Nevis', code: 'KN', flag: 'https://flagcdn.com/kn.svg', region: 'Americas' },
  { name: 'Saint Lucia', code: 'LC', flag: 'https://flagcdn.com/lc.svg', region: 'Americas' },
  { name: 'Saint Vincent and the Grenadines', code: 'VC', flag: 'https://flagcdn.com/vc.svg', region: 'Americas' },
  { name: 'Samoa', code: 'WS', flag: 'https://flagcdn.com/ws.svg', region: 'Oceania' },
  { name: 'San Marino', code: 'SM', flag: 'https://flagcdn.com/sm.svg', region: 'Europe' },
  { name: 'Sao Tome and Principe', code: 'ST', flag: 'https://flagcdn.com/st.svg', region: 'Africa' },
  { name: 'Saudi Arabia', code: 'SA', flag: 'https://flagcdn.com/sa.svg', region: 'Asia' },
  { name: 'Senegal', code: 'SN', flag: 'https://flagcdn.com/sn.svg', region: 'Africa' },
  { name: 'Serbia', code: 'RS', flag: 'https://flagcdn.com/rs.svg', region: 'Europe' },
  { name: 'Seychelles', code: 'SC', flag: 'https://flagcdn.com/sc.svg', region: 'Africa' },
  { name: 'Sierra Leone', code: 'SL', flag: 'https://flagcdn.com/sl.svg', region: 'Africa' },
  { name: 'Singapore', code: 'SG', flag: 'https://flagcdn.com/sg.svg', region: 'Asia' },
  { name: 'Slovakia', code: 'SK', flag: 'https://flagcdn.com/sk.svg', region: 'Europe' },
  { name: 'Slovenia', code: 'SI', flag: 'https://flagcdn.com/si.svg', region: 'Europe' },
  { name: 'Solomon Islands', code: 'SB', flag: 'https://flagcdn.com/sb.svg', region: 'Oceania' },
  { name: 'Somalia', code: 'SO', flag: 'https://flagcdn.com/so.svg', region: 'Africa' },
  { name: 'South Africa', code: 'ZA', flag: 'https://flagcdn.com/za.svg', region: 'Africa' },
  { name: 'South Korea', code: 'KR', flag: 'https://flagcdn.com/kr.svg', region: 'Asia' },
  { name: 'South Sudan', code: 'SS', flag: 'https://flagcdn.com/ss.svg', region: 'Africa' },
  { name: 'Spain', code: 'ES', flag: 'https://flagcdn.com/es.svg', region: 'Europe' },
  { name: 'Sri Lanka', code: 'LK', flag: 'https://flagcdn.com/lk.svg', region: 'Asia' },
  { name: 'Sudan', code: 'SD', flag: 'https://flagcdn.com/sd.svg', region: 'Africa' },
  { name: 'Suriname', code: 'SR', flag: 'https://flagcdn.com/sr.svg', region: 'Americas' },
  { name: 'Sweden', code: 'SE', flag: 'https://flagcdn.com/se.svg', region: 'Europe' },
  { name: 'Switzerland', code: 'CH', flag: 'https://flagcdn.com/ch.svg', region: 'Europe' },
  { name: 'Syria', code: 'SY', flag: 'https://flagcdn.com/sy.svg', region: 'Asia' },
  { name: 'Tajikistan', code: 'TJ', flag: 'https://flagcdn.com/tj.svg', region: 'Asia' },
  { name: 'Tanzania', code: 'TZ', flag: 'https://flagcdn.com/tz.svg', region: 'Africa' },
  { name: 'Thailand', code: 'TH', flag: 'https://flagcdn.com/th.svg', region: 'Asia' },
  { name: 'Timor-Leste', code: 'TL', flag: 'https://flagcdn.com/tl.svg', region: 'Asia' },
  { name: 'Togo', code: 'TG', flag: 'https://flagcdn.com/tg.svg', region: 'Africa' },
  { name: 'Tonga', code: 'TO', flag: 'https://flagcdn.com/to.svg', region: 'Oceania' },
  { name: 'Trinidad and Tobago', code: 'TT', flag: 'https://flagcdn.com/tt.svg', region: 'Americas' },
  { name: 'Tunisia', code: 'TN', flag: 'https://flagcdn.com/tn.svg', region: 'Africa' },
  { name: 'Turkey', code: 'TR', flag: 'https://flagcdn.com/tr.svg', region: 'Asia' },
  { name: 'Turkmenistan', code: 'TM', flag: 'https://flagcdn.com/tm.svg', region: 'Asia' },
  { name: 'Tuvalu', code: 'TV', flag: 'https://flagcdn.com/tv.svg', region: 'Oceania' },
  { name: 'Uganda', code: 'UG', flag: 'https://flagcdn.com/ug.svg', region: 'Africa' },
  { name: 'Ukraine', code: 'UA', flag: 'https://flagcdn.com/ua.svg', region: 'Europe' },
  { name: 'United Arab Emirates', code: 'AE', flag: 'https://flagcdn.com/ae.svg', region: 'Asia' },
  { name: 'United Kingdom', code: 'GB', flag: 'https://flagcdn.com/gb.svg', region: 'Europe' },
  { name: 'United States', code: 'US', flag: 'https://flagcdn.com/us.svg', region: 'Americas' },
  { name: 'Uruguay', code: 'UY', flag: 'https://flagcdn.com/uy.svg', region: 'Americas' },
  { name: 'Uzbekistan', code: 'UZ', flag: 'https://flagcdn.com/uz.svg', region: 'Asia' },
  { name: 'Vanuatu', code: 'VU', flag: 'https://flagcdn.com/vu.svg', region: 'Oceania' },
  { name: 'Vatican City', code: 'VA', flag: 'https://flagcdn.com/va.svg', region: 'Europe' },
  { name: 'Venezuela', code: 'VE', flag: 'https://flagcdn.com/ve.svg', region: 'Americas' },
  { name: 'Vietnam', code: 'VN', flag: 'https://flagcdn.com/vn.svg', region: 'Asia' },
  { name: 'Yemen', code: 'YE', flag: 'https://flagcdn.com/ye.svg', region: 'Asia' },
  { name: 'Zambia', code: 'ZM', flag: 'https://flagcdn.com/zm.svg', region: 'Africa' },
  { name: 'Zimbabwe', code: 'ZW', flag: 'https://flagcdn.com/zw.svg', region: 'Africa' }
];

// Daftar gambar landmark negara
const countryLandmarks = [
  { country: 'Indonesia', image: 'https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg', name: 'Monumen Nasional' },
  { country: 'France', image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg', name: 'Menara Eiffel' },
  { country: 'China', image: 'https://images.pexels.com/photos/161401/pexels-photo-161401.jpeg', name: 'Tembok Besar China' },
  { country: 'India', image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg', name: 'Taj Mahal' },
  { country: 'United States', image: 'https://images.pexels.com/photos/2087391/pexels-photo-2087391.jpeg', name: 'Patung Liberty' },
  { country: 'Italy', image: 'https://images.pexels.com/photos/1796730/pexels-photo-1796730.jpeg', name: 'Colosseum' },
  { country: 'Egypt', image: 'https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg', name: 'Piramida Giza' },
  { country: 'Brazil', image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg', name: 'Christ the Redeemer' },
  { country: 'Australia', image: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg', name: 'Sydney Opera House' },
  { country: 'Japan', image: 'https://images.pexels.com/photos/161251/pexels-photo-161251.jpeg', name: 'Gunung Fuji' }
];

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const [answerOptions, setAnswerOptions] = useState([]);

  // Load leaderboard dari localStorage
  useEffect(() => {
    const savedLeaderboard = localStorage.getItem('flagGameLeaderboard');
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    }
  }, []);

  // Simpan leaderboard ke localStorage
  useEffect(() => {
    if (leaderboard.length > 0) {
      localStorage.setItem('flagGameLeaderboard', JSON.stringify(leaderboard));
    }
  }, [leaderboard]);

  const startGame = () => {
    if (!playerName.trim()) return;
    setShowNameInput(false);
    setGameStarted(true);
    loadNewCountry();
  };

  const loadNewCountry = () => {
    // Pilih negara secara acak
    const randomIndex = Math.floor(Math.random() * countries.length);
    const selectedCountry = countries[randomIndex];
    setCurrentCountry(selectedCountry);
    setShowAnswer(false);
    setUserGuess('');

    // Generate pilihan jawaban yang tidak termasuk jawaban yang benar
    const wrongOptions = countries
      .filter(country => country.code !== selectedCountry.code)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(country => country.name);

    // Tambahkan jawaban yang benar ke pilihan
    const allOptions = [...wrongOptions, selectedCountry.name]
      .sort(() => Math.random() - 0.5);

    setAnswerOptions(allOptions);
  };

  const handleGuess = (guess) => {
    if (!currentCountry) return;
    
    setUserGuess(guess);
    setShowAnswer(true);
    
    if (guess.toLowerCase() === currentCountry.name.toLowerCase()) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (round < 10) {
        setRound(round + 1);
        loadNewCountry();
      } else {
        // Game selesai, update leaderboard
        const newScore = {
          name: playerName,
          score: score + (guess.toLowerCase() === currentCountry.name.toLowerCase() ? 1 : 0),
          date: new Date().toLocaleDateString()
        };
        setLeaderboard(prev => {
          const updated = [...prev, newScore]
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);
          return updated;
        });
        setGameStarted(false);
        setRound(1);
        setScore(0);
      }
    }, 2000);
  };

  const restartGame = () => {
    setShowNameInput(true);
    setPlayerName('');
    setGameStarted(false);
    setScore(0);
    setRound(1);
  };

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Tebak Bendera Negara
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Uji pengetahuanmu tentang bendera negara-negara di dunia!
          </p>
        </motion.div>

        {!gameStarted && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {countryLandmarks.map((landmark, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={landmark.image}
                    alt={landmark.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">{landmark.name}</h3>
                  <p className="text-gray-300">{landmark.country}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {showNameInput && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card max-w-md mx-auto p-6 mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">Masukkan Nama Kamu</h2>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Nama kamu..."
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 mb-4"
            />
            <button
              onClick={startGame}
              className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors"
            >
              Mulai Bermain
            </button>
          </motion.div>
        )}

        {gameStarted && currentCountry && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card max-w-2xl mx-auto p-6 mb-8"
          >
            <div className="text-center mb-4">
              <h2 className="text-2xl font-semibold text-white">Round {round}/10</h2>
              <p className="text-xl text-blue-400">Score: {score}</p>
            </div>

            <div className="mb-6">
              <div className="relative w-full aspect-video mb-4">
                <Image
                  src={currentCountry.flag}
                  alt="Country Flag"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {!showAnswer ? (
              <div className="grid grid-cols-2 gap-4">
                {answerOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleGuess(option)}
                    className="py-2 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-center p-4 rounded-lg ${
                  userGuess.toLowerCase() === currentCountry.name.toLowerCase()
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                <p className="text-xl font-semibold">
                  {userGuess.toLowerCase() === currentCountry.name.toLowerCase()
                    ? 'Benar!'
                    : 'Salah!'}
                </p>
                <p className="text-white">Jawaban yang benar: {currentCountry.name}</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {leaderboard.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card max-w-md mx-auto p-6"
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">Leaderboard</h2>
            <div className="space-y-2">
              {leaderboard.map((entry, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-white/5 rounded-lg"
                >
                  <span className="font-medium text-white">
                    {index + 1}. {entry.name}
                  </span>
                  <span className="text-blue-400">{entry.score} poin</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {!gameStarted && !showNameInput && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-8"
          >
            <button
              onClick={restartGame}
              className="py-2 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors"
            >
              Main Lagi
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
