'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import useSound from 'use-sound';
import { Share2, Trophy, BarChart2, Globe, Star, Zap, Clock } from 'lucide-react';

// Import sound effects
const correctSound = '/sounds/correct.mp3';
const wrongSound = '/sounds/wrong.mp3';
const gameCompleteSound = '/sounds/game-complete.mp3';

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

// Daftar gambar landmark negara yang valid
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
  { country: 'Japan', image: 'https://images.pexels.com/photos/931018/pexels-photo-931018.jpeg', name: 'Gunung Fuji' }
];

// Daftar fakta unik negara
const countryFacts = [
  { country: 'Indonesia', fact: 'Memiliki lebih dari 17.000 pulau, menjadikannya negara kepulauan terbesar di dunia.' },
  { country: 'Japan', fact: 'Memiliki lebih dari 5 juta mesin penjual otomatis, menjual berbagai macam barang termasuk telur dan payung.' },
  { country: 'Brazil', fact: 'Memiliki hutan hujan Amazon yang merupakan hutan hujan terbesar di dunia.' },
  { country: 'Iceland', fact: 'Tidak memiliki nyamuk, menjadikannya satu-satunya negara di dunia tanpa nyamuk.' },
  { country: 'Canada', fact: 'Memiliki garis pantai terpanjang di dunia, lebih dari 202.000 kilometer.' },
  { country: 'Russia', fact: 'Memiliki 11 zona waktu, lebih banyak dari negara manapun di dunia.' },
  { country: 'Australia', fact: 'Memiliki lebih banyak unta liar daripada unta di Timur Tengah.' },
  { country: 'South Africa', fact: 'Satu-satunya negara di dunia yang memiliki 3 ibu kota: Pretoria, Cape Town, dan Bloemfontein.' },
  { country: 'Vatican City', fact: 'Negara terkecil di dunia, dengan luas hanya 0.44 kilometer persegi.' },
  { country: 'China', fact: 'Memiliki dinding terpanjang di dunia, Tembok Besar China, dengan panjang lebih dari 21.000 kilometer.' }
];

// Tambahkan array untuk fitur-fitur game
const gameFeatures = [
  {
    title: 'Mode Kesulitan',
    description: 'Pilih tingkat kesulitan yang sesuai dengan kemampuanmu, dari mudah hingga sulit.',
    icon: '🎯'
  },
  {
    title: 'Statistik Lengkap',
    description: 'Pantau perkembanganmu dengan statistik permainan yang detail.',
    icon: '📊'
  },
  {
    title: 'Fakta Unik',
    description: 'Pelajari fakta menarik tentang berbagai negara di dunia.',
    icon: '🌍'
  },
  {
    title: 'Efek Visual',
    description: 'Nikmati pengalaman bermain yang menyenangkan dengan efek visual dan suara.',
    icon: '✨'
  }
];

// Tambahkan array untuk hero text
const heroTexts = [
  "Tebak Bendera Negara",
  "Uji Pengetahuanmu",
  "Jelajahi Dunia",
  "Belajar Sambil Bermain"
];

// Add these constants at the top of the file, after the imports
const DIFFICULTY_SETTINGS = {
  easy: {
    questions: 5,
    timePerQuestion: 30,
    pointsPerCorrect: 10,
    streakBonus: 5
  },
  medium: {
    questions: 10,
    timePerQuestion: 20,
    pointsPerCorrect: 15,
    streakBonus: 10
  },
  hard: {
    questions: 20,
    timePerQuestion: 15,
    pointsPerCorrect: 20,
    streakBonus: 15
  }
};

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
  const [playCorrect] = useSound(correctSound);
  const [playWrong] = useSound(wrongSound);
  const [playGameComplete] = useSound(gameCompleteSound);
  const [showGameComplete, setShowGameComplete] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [maxQuestions, setMaxQuestions] = useState(DIFFICULTY_SETTINGS.medium.questions);
  const [timePerQuestion, setTimePerQuestion] = useState(DIFFICULTY_SETTINGS.medium.timePerQuestion);
  const [pointsPerCorrect, setPointsPerCorrect] = useState(DIFFICULTY_SETTINGS.medium.pointsPerCorrect);
  const [streakBonus, setStreakBonus] = useState(DIFFICULTY_SETTINGS.medium.streakBonus);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [gameStats, setGameStats] = useState({
    totalGames: 0,
    totalScore: 0,
    averageScore: 0,
    mostMissedCountries: {},
    accuracy: 0
  });
  const [showStats, setShowStats] = useState(false);
  const [currentFact, setCurrentFact] = useState(0);
  const [currentHeroText, setCurrentHeroText] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);

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

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % countries.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Rotate facts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % countryFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Rotate hero text
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroText((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Add this useEffect for the timer
  useEffect(() => {
    let timer;
    if (gameStarted && timeLeft > 0 && !showAnswer) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleGuess(''); // Auto-submit when time runs out
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, timeLeft, showAnswer]);

  const startGame = () => {
    if (!playerName.trim()) return;
    setShowNameInput(false);
    setGameStarted(true);
    setScore(0);
    setRound(1);
    setCurrentStreak(0);
    setMaxStreak(0);
    setTimeLeft(timePerQuestion);
    setMaxQuestions(DIFFICULTY_SETTINGS[difficulty].questions);
    loadNewCountry();
  };

  const loadNewCountry = () => {
    // Pilih negara secara acak
    const randomIndex = Math.floor(Math.random() * countries.length);
    const selectedCountry = countries[randomIndex];
    setCurrentCountry(selectedCountry);
    setShowAnswer(false);
    setUserGuess('');

    // Generate pilihan jawaban berdasarkan tingkat kesulitan
    const options = getAnswerOptions(selectedCountry);
    setAnswerOptions(options);
  };

  const handleGuess = (guess) => {
    if (!currentCountry || showAnswer) return;
    
    setUserGuess(guess);
    setShowAnswer(true);
    
    const isCorrect = guess.toLowerCase() === currentCountry.name.toLowerCase();
    
    if (isCorrect) {
      const basePoints = pointsPerCorrect;
      const streakPoints = currentStreak * streakBonus;
      const totalPoints = basePoints + streakPoints;
      
      setScore(score + totalPoints);
      setCurrentStreak(currentStreak + 1);
      setMaxStreak(Math.max(maxStreak, currentStreak + 1));
      setIsCorrect(true);
      setShowConfetti(true);
      playCorrect();
    } else {
      setCurrentStreak(0);
      setIsCorrect(false);
      playWrong();
    }

    setTimeout(() => {
      if (round < maxQuestions) {
        setRound(round + 1);
        setTimeLeft(timePerQuestion);
        setShowAnswer(false);
        setShowConfetti(false);
        loadNewCountry();
      } else {
        setShowGameComplete(true);
        playGameComplete();
        setTimeout(() => {
          endGame();
        }, 3000);
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

  const getAnswerOptions = (correctCountry) => {
    let options = [];
    switch (difficulty) {
      case 'easy':
        // Hanya negara dari region yang sama
        options = countries
          .filter(country => country.region === correctCountry.region)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        break;
      case 'medium':
        // Campuran negara dari region yang sama dan berbeda
        options = countries
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        break;
      case 'hard':
        // Semua negara acak
        options = countries
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        break;
    }
    return [...options, correctCountry].sort(() => Math.random() - 0.5);
  };

  const updateStats = (correct, country) => {
    setGameStats(prev => {
      const newStats = { ...prev };
      newStats.totalGames += 1;
      newStats.totalScore += correct ? 1 : 0;
      newStats.averageScore = newStats.totalScore / newStats.totalGames;
      newStats.accuracy = (newStats.totalScore / newStats.totalGames) * 100;
      
      if (!correct) {
        newStats.mostMissedCountries[country] = (newStats.mostMissedCountries[country] || 0) + 1;
      }
      
      return newStats;
    });
  };

  const shareScore = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Tebak Bendera Negara',
        text: `Saya baru saja mendapatkan skor ${score} di Tebak Bendera Negara!`,
        url: window.location.href
      });
    }
  };

  const scrollToNameInput = () => {
    const nameInputElement = document.getElementById('masukan-nama');
    if (nameInputElement) {
      nameInputElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const endGame = () => {
    // Update leaderboard with current score
    if (playerName && score > 0) {
      const newScore = {
        name: playerName,
        score: score,
        date: new Date().toLocaleDateString()
      };
      
      setLeaderboard(prev => {
        const updated = [...prev, newScore]
          .sort((a, b) => b.score - a.score)
          .slice(0, 5);
        return updated;
      });
    }

    // Reset game state
    setGameStarted(false);
    setShowAnswer(false);
    setShowConfetti(false);
    setShowGameComplete(false);
    setCurrentStreak(0);
    setTimeLeft(timePerQuestion);
    setUserGuess('');
    setCurrentCountry(null);
  };

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-black via-cyan-900 to-cyan-500">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 relative h-64 md:h-96 flex items-center justify-center"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                                 linear-gradient(to bottom, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
          </div>

          {/* Animated Text */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentHeroText}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-300 to-cyan-200"
              >
                {heroTexts[currentHeroText]}
              </motion.h1>
            </AnimatePresence>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-cyan-100 mb-8"
            >
              Uji pengetahuanmu tentang bendera negara-negara di dunia!
            </motion.p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <button
                onClick={() => {
                  setShowNameInput(true);
                  setGameStarted(false);
                  setTimeout(scrollToNameInput, 100);
                }}
                className="glass-button text-lg px-8 py-3 bg-gradient-to-r from-emerald-600 to-cyan-500 hover:from-emerald-500 hover:to-cyan-400"
              >
                Mulai Bermain
              </button>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-0 left-0 right-0 flex justify-center space-x-4"
          >
            {heroTexts.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentHeroText ? 'bg-cyan-400' : 'bg-cyan-400/30'
                }`}
                animate={{
                  scale: index === currentHeroText ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </motion.div>
        </motion.div>

        {!gameStarted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative h-64 md:h-96 mb-12 overflow-hidden rounded-2xl"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={countries[currentSlide].flag}
                  alt={`Flag of ${countries[currentSlide].name}`}
                  fill
                  className="object-cover"
                  style={{ transform: 'perspective(1000px) rotateY(10deg)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h2 className="text-2xl md:text-4xl font-bold mb-2">
                    {countries[currentSlide].name}
                  </h2>
                  <p className="text-sm md:text-lg opacity-90">
                    Region: {countries[currentSlide].region}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
        
        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {gameFeatures.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="glass-card p-6"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* How to Play Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card max-w-3xl mx-auto p-8 mb-12"
        >
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Cara Bermain</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">1️⃣</div>
              <h3 className="text-lg font-medium text-white mb-2">Pilih Mode</h3>
              <p className="text-gray-300">Pilih tingkat kesulitan yang sesuai</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">2️⃣</div>
              <h3 className="text-lg font-medium text-white mb-2">Tebak Bendera</h3>
              <p className="text-gray-300">Tebak negara dari bendera yang ditampilkan</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">3️⃣</div>
              <h3 className="text-lg font-medium text-white mb-2">Raih Skor</h3>
              <p className="text-gray-300">Dapatkan skor tertinggi dan bagikan ke teman</p>
            </div>
          </div>
        </motion.div>

          {/* Country Facts Carousel */}
          {!gameStarted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card max-w-2xl mx-auto p-6 mb-8"
            style={{
              transform: 'perspective(1000px) rotateX(5deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="flex items-center mb-4">
              <Globe className="w-6 h-6 text-emerald-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">Fakta Unik Negara</h2>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFact}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-white"
              >
                <h3 className="text-lg font-medium mb-2">{countryFacts[currentFact].country}</h3>
                <p className="text-gray-300">{countryFacts[currentFact].fact}</p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* Name Input Form */}
        {showNameInput && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card max-w-md mx-auto p-6 mb-8"
            id="masukan-nama"
          >
            <h2 className="text-2xl font-semibold mb-4 text-emerald-100">Masukkan Nama Kamu</h2>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Nama kamu..."
              className="w-full px-4 py-2 rounded-lg bg-emerald-900/30 border border-emerald-500/20 text-emerald-100 placeholder-emerald-300/50 mb-4"
            />
            <button
              onClick={startGame}
              className="w-full py-2 px-4 bg-gradient-to-r from-emerald-600 to-cyan-500 text-white rounded-lg hover:from-emerald-500 hover:to-cyan-400 transition-colors"
            >
              Lanjutkan
            </button>
          </motion.div>
        )}

        {/* Difficulty Selector */}
        {!gameStarted && !showNameInput && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card max-w-md mx-auto p-6 mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">Pilih Tingkat Kesulitan</h2>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(DIFFICULTY_SETTINGS).map(([level, settings]) => (
                <motion.button
                  key={level}
                  onClick={() => {
                    setDifficulty(level);
                    setMaxQuestions(settings.questions);
                    setTimePerQuestion(settings.timePerQuestion);
                    setPointsPerCorrect(settings.pointsPerCorrect);
                    setStreakBonus(settings.streakBonus);
                  }}
                  className={`py-2 px-4 rounded-lg transition-all ${
                    difficulty === level
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-300 text-emerald-100'
                      : 'bg-emerald-900/30 text-emerald-100 hover:bg-emerald-800/30'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex flex-col items-center">
                    <span className="capitalize">{level}</span>
                    <span className="text-sm opacity-80">{settings.questions} soal</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Game Stats */}
        {showStats && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card max-w-md mx-auto p-6 mb-8"
          >
            <div className="flex items-center mb-4">
              <BarChart2 className="w-6 h-6 text-emerald-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">Statistik Permainan</h2>
            </div>
            <div className="space-y-2 text-white">
              <p>Total Permainan: {gameStats.totalGames}</p>
              <p>Skor Rata-rata: {gameStats.averageScore.toFixed(1)}</p>
              <p>Akurasi: {gameStats.accuracy.toFixed(1)}%</p>
              <div>
                <p className="font-medium mb-2">Negara yang Paling Sering Salah:</p>
                {Object.entries(gameStats.mostMissedCountries)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 3)
                  .map(([country, count]) => (
                    <p key={country} className="text-gray-300">
                      {country}: {count} kali
                    </p>
                  ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Share Button */}
        {!gameStarted && !showNameInput && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-8 space-x-4"
          >
            <button
              onClick={() => setShowStats(!showStats)}
              className="glass-button inline-flex items-center"
            >
              <Trophy className="w-5 h-5 mr-2" />
              Statistik
            </button>
            <button
              onClick={shareScore}
              className="glass-button inline-flex items-center"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Bagikan
            </button>
          </motion.div>
        )}

        {/* Game Stats Bar */}
        {gameStarted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card max-w-2xl mx-auto p-4 mb-4 flex justify-between items-center"
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span className="text-emerald-100">Score: {score}</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-5 h-5 text-cyan-400 mr-1" />
                <span className="text-emerald-100">Streak: {currentStreak}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-red-400 mr-1" />
                <span className="text-emerald-100">{timeLeft}s</span>
              </div>
            </div>
          </motion.div>
        )}

        {gameStarted && currentCountry && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card max-w-2xl mx-auto p-6 mb-8"
          >
            <div className="text-center mb-4">
              <h2 className="text-2xl font-semibold text-emerald-100">Round {round}/{maxQuestions}</h2>
              <p className="text-xl text-emerald-400">Score: {score}</p>
            </div>

            <motion.div
              className="relative w-full aspect-video mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src={currentCountry.flag}
                alt="Country Flag"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {!showAnswer ? (
              <div className="grid grid-cols-2 gap-4">
                {answerOptions.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleGuess(option.name)}
                    className="py-2 px-4 bg-emerald-900/30 hover:bg-emerald-800/30 text-emerald-100 rounded-lg transition-colors relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10">{option.name}</span>
                  </motion.button>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`text-center p-4 rounded-lg overflow-hidden relative ${
                  userGuess.toLowerCase() === currentCountry.name.toLowerCase()
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                />
                
                <motion.p 
                  className="text-xl font-semibold relative z-10"
                  initial={{ scale: 0.5, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 500,
                    damping: 10
                  }}
                >
                  {userGuess.toLowerCase() === currentCountry.name.toLowerCase()
                    ? 'Benar! 🎉'
                    : 'Salah! 😢'}
                </motion.p>
                
                <motion.div
                  className="relative z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-emerald-100">
                    Jawaban yang benar: {currentCountry.name}
                  </p>
                  {userGuess.toLowerCase() === currentCountry.name.toLowerCase() && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mt-2"
                    >
                      <motion.div
                        className="w-12 h-12 mx-auto"
                        animate={{ 
                          rotate: 360,
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          duration: 1,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <Trophy className="w-full h-full text-yellow-400" />
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
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
                  className="flex justify-between items-center p-2 bg-emerald-900/30 rounded-lg"
                >
                  <span className="font-medium text-white">
                    {index + 1}. {entry.name}
                  </span>
                  <span className="text-emerald-400">{entry.score} poin</span>
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
              className="py-2 px-6 bg-gradient-to-r from-emerald-600 to-cyan-500 text-white rounded-lg hover:from-emerald-500 hover:to-cyan-400 transition-colors"
            >
              Main Lagi
            </button>
          </motion.div>
        )}

        {/* Game Completion Effect */}
        {showGameComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              className="relative bg-gradient-to-br from-emerald-500 to-cyan-500 p-8 rounded-2xl text-center max-w-md mx-4"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                🎉
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-2">Game Selesai!</h2>
              <p className="text-xl text-white/90 mb-4">Skor Akhir: {score}</p>
              <p className="text-lg text-white/80">Streak Terbaik: {maxStreak}</p>
            </motion.div>
          </motion.div>
        )}

        {/* Confetti Effect */}
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-40"
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ['#fbbf24', '#34d399', '#60a5fa', '#f472b6'][Math.floor(Math.random() * 4)],
                }}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -10,
                  scale: 0,
                  rotate: Math.random() * 360,
                }}
                animate={{
                  y: window.innerHeight + 100,
                  scale: [0, 1, 0],
                  rotate: Math.random() * 360,
                  x: [
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth,
                  ],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: 1,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        )}

      </div>
    </main>
  );
}
