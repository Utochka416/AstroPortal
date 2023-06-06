            const TWOPI = 2.0 * Math.PI;
            const XKMPER_WGS72 = 6378.135; // Semi-major axis of the Earth for WGS72 in kilometers
			const F = 1 / 298.26; // Flattening factor for WGS72
            function AcTan(y, x) {
                if (x > 0) {
                    return Math.atan2(y, x);
                } else if (x < 0) {
                    if (y >= 0) {
                        return Math.atan2(y, x) + Math.PI;
                    } else {
                        return Math.atan2(y, x) - Math.PI;
                    }
                } else {
                    if (y > 0) {
                        return Math.PI / 2;
                    } else if (y < 0) {
                        return -Math.PI / 2;
                    } else {
                        return 0.0; // undefined
                    }
                }
			};

            function Construct(posEcf, theta) {
                theta = theta % TWOPI;

                if (theta < 0.0) {
                    theta += TWOPI; // "wrap" negative modulo
                }

                const kmSemiMaj = XKMPER_WGS72;

                const r = Math.sqrt(posEcf.m_x * posEcf.m_x + posEcf.m_y * posEcf.m_y);
                const e2 = F * (2.0 - F);
                let lat = AcTan(posEcf.m_z, r);

                const delta = 1.0e-07;
                let phi;
                let c;

                do {
                    phi = lat;
                    c = 1.0 / Math.sqrt(1.0 - e2 * Math.pow(Math.sin(phi), 2));
                    lat = AcTan(posEcf.m_z + kmSemiMaj * c * e2 * Math.sin(phi), r);
                } while (Math.abs(lat - phi) > delta);

                const m_Lat = lat;
                const m_Lon = theta;
                const m_Alt = r / Math.cos(lat) - kmSemiMaj * c;

                return { latitude: (m_Lat * 180) / Math.PI, longitude: (m_Lon * 180) / Math.PI, altitude: m_Alt };
			};