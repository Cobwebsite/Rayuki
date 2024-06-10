var QrCodeReader;
(QrCodeReader||(QrCodeReader = {}));
(function (QrCodeReader) {
const moduleName = `QrCodeReader`;
const _ = {};

const Sw = {};
_.Sw = {};
let _n;
Sw.Matrix=class Matrix {
    data;
    width;
    constructor(width, height, buffer) {
        this.width = width;
        const bufferSize = width * height;
        if (buffer && buffer.length !== bufferSize) {
            throw new Error("Wrong buffer size");
        }
        this.data = buffer || new Uint8ClampedArray(bufferSize);
    }
    get(x, y) {
        return this.data[y * this.width + x];
    }
    set(x, y, value) {
        this.data[y * this.width + x] = value;
    }
}
Sw.Matrix.Namespace=`QrCodeReader.Sw`;

_.Sw.Matrix=Sw.Matrix;
(function (ModeByte) {
    ModeByte[ModeByte["Terminator"] = 0] = "Terminator";
    ModeByte[ModeByte["Numeric"] = 1] = "Numeric";
    ModeByte[ModeByte["Alphanumeric"] = 2] = "Alphanumeric";
    ModeByte[ModeByte["Byte"] = 4] = "Byte";
    ModeByte[ModeByte["Kanji"] = 8] = "Kanji";
    ModeByte[ModeByte["ECI"] = 7] = "ECI";
    ModeByte[ModeByte["StructuredAppend"] = 3] = "StructuredAppend";
})(Sw.ModeByte || (Sw.ModeByte = {}));

_.Sw.ModeByte=Sw.ModeByte;
Sw.BitStream=class BitStream {
    bytes;
    byteOffset = 0;
    bitOffset = 0;
    constructor(bytes) {
        this.bytes = bytes;
    }
    readBits(numBits) {
        if (numBits < 1 || numBits > 32 || numBits > this.available()) {
            throw new Error("Cannot read " + numBits.toString() + " bits");
        }
        let result = 0;
        if (this.bitOffset > 0) {
            const bitsLeft = 8 - this.bitOffset;
            const toRead = numBits < bitsLeft ? numBits : bitsLeft;
            const bitsToNotRead = bitsLeft - toRead;
            const mask = (0xFF >> (8 - toRead)) << bitsToNotRead;
            result = (this.bytes[this.byteOffset] & mask) >> bitsToNotRead;
            numBits -= toRead;
            this.bitOffset += toRead;
            if (this.bitOffset === 8) {
                this.bitOffset = 0;
                this.byteOffset++;
            }
        }
        if (numBits > 0) {
            while (numBits >= 8) {
                result = (result << 8) | (this.bytes[this.byteOffset] & 0xFF);
                this.byteOffset++;
                numBits -= 8;
            }
            if (numBits > 0) {
                const bitsToNotRead = 8 - numBits;
                const mask = (0xFF >> bitsToNotRead) << bitsToNotRead;
                result = (result << numBits) | ((this.bytes[this.byteOffset] & mask) >> bitsToNotRead);
                this.bitOffset += numBits;
            }
        }
        return result;
    }
    available() {
        return 8 * (this.bytes.length - this.byteOffset) - this.bitOffset;
    }
}
Sw.BitStream.Namespace=`QrCodeReader.Sw`;

_.Sw.BitStream=Sw.BitStream;
Sw.addOrSubtractGF=function addOrSubtractGF(a, b) {
    return a ^ b;
}

_.Sw.addOrSubtractGF=Sw.addOrSubtractGF;
Sw.VERSIONS= [
    {
        infoBits: null,
        versionNumber: 1,
        alignmentPatternCenters: [],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 7,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 19 }],
            },
            {
                ecCodewordsPerBlock: 10,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 16 }],
            },
            {
                ecCodewordsPerBlock: 13,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 13 }],
            },
            {
                ecCodewordsPerBlock: 17,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 9 }],
            },
        ],
    },
    {
        infoBits: null,
        versionNumber: 2,
        alignmentPatternCenters: [6, 18],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 10,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 34 }],
            },
            {
                ecCodewordsPerBlock: 16,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 28 }],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 22 }],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 16 }],
            },
        ],
    },
    {
        infoBits: null,
        versionNumber: 3,
        alignmentPatternCenters: [6, 22],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 15,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 55 }],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 44 }],
            },
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 17 }],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 13 }],
            },
        ],
    },
    {
        infoBits: null,
        versionNumber: 4,
        alignmentPatternCenters: [6, 26],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 20,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 80 }],
            },
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 32 }],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 24 }],
            },
            {
                ecCodewordsPerBlock: 16,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 9 }],
            },
        ],
    },
    {
        infoBits: null,
        versionNumber: 5,
        alignmentPatternCenters: [6, 30],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 108 }],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 43 }],
            },
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 15 },
                    { numBlocks: 2, dataCodewordsPerBlock: 16 },
                ],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 11 },
                    { numBlocks: 2, dataCodewordsPerBlock: 12 },
                ],
            },
        ],
    },
    {
        infoBits: null,
        versionNumber: 6,
        alignmentPatternCenters: [6, 34],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 68 }],
            },
            {
                ecCodewordsPerBlock: 16,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 27 }],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 19 }],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 15 }],
            },
        ],
    },
    {
        infoBits: 0x07C94,
        versionNumber: 7,
        alignmentPatternCenters: [6, 22, 38],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 20,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 78 }],
            },
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 31 }],
            },
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 14 },
                    { numBlocks: 4, dataCodewordsPerBlock: 15 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 13 },
                    { numBlocks: 1, dataCodewordsPerBlock: 14 },
                ],
            },
        ],
    },
    {
        infoBits: 0x085BC,
        versionNumber: 8,
        alignmentPatternCenters: [6, 24, 42],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 97 }],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 38 },
                    { numBlocks: 2, dataCodewordsPerBlock: 39 },
                ],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 18 },
                    { numBlocks: 2, dataCodewordsPerBlock: 19 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 14 },
                    { numBlocks: 2, dataCodewordsPerBlock: 15 },
                ],
            },
        ],
    },
    {
        infoBits: 0x09A99,
        versionNumber: 9,
        alignmentPatternCenters: [6, 26, 46],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 116 }],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 36 },
                    { numBlocks: 2, dataCodewordsPerBlock: 37 },
                ],
            },
            {
                ecCodewordsPerBlock: 20,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 16 },
                    { numBlocks: 4, dataCodewordsPerBlock: 17 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 12 },
                    { numBlocks: 4, dataCodewordsPerBlock: 13 },
                ],
            },
        ],
    },
    {
        infoBits: 0x0A4D3,
        versionNumber: 10,
        alignmentPatternCenters: [6, 28, 50],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 68 },
                    { numBlocks: 2, dataCodewordsPerBlock: 69 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 43 },
                    { numBlocks: 1, dataCodewordsPerBlock: 44 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 19 },
                    { numBlocks: 2, dataCodewordsPerBlock: 20 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 15 },
                    { numBlocks: 2, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x0BBF6,
        versionNumber: 11,
        alignmentPatternCenters: [6, 30, 54],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 20,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 81 }],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 1, dataCodewordsPerBlock: 50 },
                    { numBlocks: 4, dataCodewordsPerBlock: 51 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 22 },
                    { numBlocks: 4, dataCodewordsPerBlock: 23 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 12 },
                    { numBlocks: 8, dataCodewordsPerBlock: 13 },
                ],
            },
        ],
    },
    {
        infoBits: 0x0C762,
        versionNumber: 12,
        alignmentPatternCenters: [6, 32, 58],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 92 },
                    { numBlocks: 2, dataCodewordsPerBlock: 93 },
                ],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 36 },
                    { numBlocks: 2, dataCodewordsPerBlock: 37 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 20 },
                    { numBlocks: 6, dataCodewordsPerBlock: 21 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 7, dataCodewordsPerBlock: 14 },
                    { numBlocks: 4, dataCodewordsPerBlock: 15 },
                ],
            },
        ],
    },
    {
        infoBits: 0x0D847,
        versionNumber: 13,
        alignmentPatternCenters: [6, 34, 62],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 107 }],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 8, dataCodewordsPerBlock: 37 },
                    { numBlocks: 1, dataCodewordsPerBlock: 38 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 8, dataCodewordsPerBlock: 20 },
                    { numBlocks: 4, dataCodewordsPerBlock: 21 },
                ],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 12, dataCodewordsPerBlock: 11 },
                    { numBlocks: 4, dataCodewordsPerBlock: 12 },
                ],
            },
        ],
    },
    {
        infoBits: 0x0E60D,
        versionNumber: 14,
        alignmentPatternCenters: [6, 26, 46, 66],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 115 },
                    { numBlocks: 1, dataCodewordsPerBlock: 116 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 40 },
                    { numBlocks: 5, dataCodewordsPerBlock: 41 },
                ],
            },
            {
                ecCodewordsPerBlock: 20,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 16 },
                    { numBlocks: 5, dataCodewordsPerBlock: 17 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 12 },
                    { numBlocks: 5, dataCodewordsPerBlock: 13 },
                ],
            },
        ],
    },
    {
        infoBits: 0x0F928,
        versionNumber: 15,
        alignmentPatternCenters: [6, 26, 48, 70],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 5, dataCodewordsPerBlock: 87 },
                    { numBlocks: 1, dataCodewordsPerBlock: 88 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 5, dataCodewordsPerBlock: 41 },
                    { numBlocks: 5, dataCodewordsPerBlock: 42 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 5, dataCodewordsPerBlock: 24 },
                    { numBlocks: 7, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 12 },
                    { numBlocks: 7, dataCodewordsPerBlock: 13 },
                ],
            },
        ],
    },
    {
        infoBits: 0x10B78,
        versionNumber: 16,
        alignmentPatternCenters: [6, 26, 50, 74],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 5, dataCodewordsPerBlock: 98 },
                    { numBlocks: 1, dataCodewordsPerBlock: 99 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 7, dataCodewordsPerBlock: 45 },
                    { numBlocks: 3, dataCodewordsPerBlock: 46 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 15, dataCodewordsPerBlock: 19 },
                    { numBlocks: 2, dataCodewordsPerBlock: 20 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 15 },
                    { numBlocks: 13, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1145D,
        versionNumber: 17,
        alignmentPatternCenters: [6, 30, 54, 78],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 1, dataCodewordsPerBlock: 107 },
                    { numBlocks: 5, dataCodewordsPerBlock: 108 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 10, dataCodewordsPerBlock: 46 },
                    { numBlocks: 1, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 1, dataCodewordsPerBlock: 22 },
                    { numBlocks: 15, dataCodewordsPerBlock: 23 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 14 },
                    { numBlocks: 17, dataCodewordsPerBlock: 15 },
                ],
            },
        ],
    },
    {
        infoBits: 0x12A17,
        versionNumber: 18,
        alignmentPatternCenters: [6, 30, 56, 82],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 5, dataCodewordsPerBlock: 120 },
                    { numBlocks: 1, dataCodewordsPerBlock: 121 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 9, dataCodewordsPerBlock: 43 },
                    { numBlocks: 4, dataCodewordsPerBlock: 44 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 17, dataCodewordsPerBlock: 22 },
                    { numBlocks: 1, dataCodewordsPerBlock: 23 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 14 },
                    { numBlocks: 19, dataCodewordsPerBlock: 15 },
                ],
            },
        ],
    },
    {
        infoBits: 0x13532,
        versionNumber: 19,
        alignmentPatternCenters: [6, 30, 58, 86],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 113 },
                    { numBlocks: 4, dataCodewordsPerBlock: 114 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 44 },
                    { numBlocks: 11, dataCodewordsPerBlock: 45 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 17, dataCodewordsPerBlock: 21 },
                    { numBlocks: 4, dataCodewordsPerBlock: 22 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 9, dataCodewordsPerBlock: 13 },
                    { numBlocks: 16, dataCodewordsPerBlock: 14 },
                ],
            },
        ],
    },
    {
        infoBits: 0x149A6,
        versionNumber: 20,
        alignmentPatternCenters: [6, 34, 62, 90],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 107 },
                    { numBlocks: 5, dataCodewordsPerBlock: 108 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 41 },
                    { numBlocks: 13, dataCodewordsPerBlock: 42 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 15, dataCodewordsPerBlock: 24 },
                    { numBlocks: 5, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 15, dataCodewordsPerBlock: 15 },
                    { numBlocks: 10, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x15683,
        versionNumber: 21,
        alignmentPatternCenters: [6, 28, 50, 72, 94],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 116 },
                    { numBlocks: 4, dataCodewordsPerBlock: 117 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [{ numBlocks: 17, dataCodewordsPerBlock: 42 }],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 17, dataCodewordsPerBlock: 22 },
                    { numBlocks: 6, dataCodewordsPerBlock: 23 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 19, dataCodewordsPerBlock: 16 },
                    { numBlocks: 6, dataCodewordsPerBlock: 17 },
                ],
            },
        ],
    },
    {
        infoBits: 0x168C9,
        versionNumber: 22,
        alignmentPatternCenters: [6, 26, 50, 74, 98],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 111 },
                    { numBlocks: 7, dataCodewordsPerBlock: 112 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [{ numBlocks: 17, dataCodewordsPerBlock: 46 }],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 7, dataCodewordsPerBlock: 24 },
                    { numBlocks: 16, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [{ numBlocks: 34, dataCodewordsPerBlock: 13 }],
            },
        ],
    },
    {
        infoBits: 0x177EC,
        versionNumber: 23,
        alignmentPatternCenters: [6, 30, 54, 74, 102],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 121 },
                    { numBlocks: 5, dataCodewordsPerBlock: 122 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 47 },
                    { numBlocks: 14, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 24 },
                    { numBlocks: 14, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 16, dataCodewordsPerBlock: 15 },
                    { numBlocks: 14, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x18EC4,
        versionNumber: 24,
        alignmentPatternCenters: [6, 28, 54, 80, 106],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 117 },
                    { numBlocks: 4, dataCodewordsPerBlock: 118 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 45 },
                    { numBlocks: 14, dataCodewordsPerBlock: 46 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 24 },
                    { numBlocks: 16, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 30, dataCodewordsPerBlock: 16 },
                    { numBlocks: 2, dataCodewordsPerBlock: 17 },
                ],
            },
        ],
    },
    {
        infoBits: 0x191E1,
        versionNumber: 25,
        alignmentPatternCenters: [6, 32, 58, 84, 110],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 8, dataCodewordsPerBlock: 106 },
                    { numBlocks: 4, dataCodewordsPerBlock: 107 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 8, dataCodewordsPerBlock: 47 },
                    { numBlocks: 13, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 7, dataCodewordsPerBlock: 24 },
                    { numBlocks: 22, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 22, dataCodewordsPerBlock: 15 },
                    { numBlocks: 13, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1AFAB,
        versionNumber: 26,
        alignmentPatternCenters: [6, 30, 58, 86, 114],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 10, dataCodewordsPerBlock: 114 },
                    { numBlocks: 2, dataCodewordsPerBlock: 115 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 19, dataCodewordsPerBlock: 46 },
                    { numBlocks: 4, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 28, dataCodewordsPerBlock: 22 },
                    { numBlocks: 6, dataCodewordsPerBlock: 23 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 33, dataCodewordsPerBlock: 16 },
                    { numBlocks: 4, dataCodewordsPerBlock: 17 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1B08E,
        versionNumber: 27,
        alignmentPatternCenters: [6, 34, 62, 90, 118],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 8, dataCodewordsPerBlock: 122 },
                    { numBlocks: 4, dataCodewordsPerBlock: 123 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 22, dataCodewordsPerBlock: 45 },
                    { numBlocks: 3, dataCodewordsPerBlock: 46 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 8, dataCodewordsPerBlock: 23 },
                    { numBlocks: 26, dataCodewordsPerBlock: 24 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 12, dataCodewordsPerBlock: 15 },
                    { numBlocks: 28, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1CC1A,
        versionNumber: 28,
        alignmentPatternCenters: [6, 26, 50, 74, 98, 122],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 117 },
                    { numBlocks: 10, dataCodewordsPerBlock: 118 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 45 },
                    { numBlocks: 23, dataCodewordsPerBlock: 46 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 24 },
                    { numBlocks: 31, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 15 },
                    { numBlocks: 31, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1D33F,
        versionNumber: 29,
        alignmentPatternCenters: [6, 30, 54, 78, 102, 126],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 7, dataCodewordsPerBlock: 116 },
                    { numBlocks: 7, dataCodewordsPerBlock: 117 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 21, dataCodewordsPerBlock: 45 },
                    { numBlocks: 7, dataCodewordsPerBlock: 46 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 1, dataCodewordsPerBlock: 23 },
                    { numBlocks: 37, dataCodewordsPerBlock: 24 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 19, dataCodewordsPerBlock: 15 },
                    { numBlocks: 26, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1ED75,
        versionNumber: 30,
        alignmentPatternCenters: [6, 26, 52, 78, 104, 130],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 5, dataCodewordsPerBlock: 115 },
                    { numBlocks: 10, dataCodewordsPerBlock: 116 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 19, dataCodewordsPerBlock: 47 },
                    { numBlocks: 10, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 15, dataCodewordsPerBlock: 24 },
                    { numBlocks: 25, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 23, dataCodewordsPerBlock: 15 },
                    { numBlocks: 25, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1F250,
        versionNumber: 31,
        alignmentPatternCenters: [6, 30, 56, 82, 108, 134],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 13, dataCodewordsPerBlock: 115 },
                    { numBlocks: 3, dataCodewordsPerBlock: 116 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 46 },
                    { numBlocks: 29, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 42, dataCodewordsPerBlock: 24 },
                    { numBlocks: 1, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 23, dataCodewordsPerBlock: 15 },
                    { numBlocks: 28, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x209D5,
        versionNumber: 32,
        alignmentPatternCenters: [6, 34, 60, 86, 112, 138],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [{ numBlocks: 17, dataCodewordsPerBlock: 115 }],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 10, dataCodewordsPerBlock: 46 },
                    { numBlocks: 23, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 10, dataCodewordsPerBlock: 24 },
                    { numBlocks: 35, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 19, dataCodewordsPerBlock: 15 },
                    { numBlocks: 35, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x216F0,
        versionNumber: 33,
        alignmentPatternCenters: [6, 30, 58, 86, 114, 142],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 17, dataCodewordsPerBlock: 115 },
                    { numBlocks: 1, dataCodewordsPerBlock: 116 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 14, dataCodewordsPerBlock: 46 },
                    { numBlocks: 21, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 29, dataCodewordsPerBlock: 24 },
                    { numBlocks: 19, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 15 },
                    { numBlocks: 46, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x228BA,
        versionNumber: 34,
        alignmentPatternCenters: [6, 34, 62, 90, 118, 146],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 13, dataCodewordsPerBlock: 115 },
                    { numBlocks: 6, dataCodewordsPerBlock: 116 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 14, dataCodewordsPerBlock: 46 },
                    { numBlocks: 23, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 44, dataCodewordsPerBlock: 24 },
                    { numBlocks: 7, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 59, dataCodewordsPerBlock: 16 },
                    { numBlocks: 1, dataCodewordsPerBlock: 17 },
                ],
            },
        ],
    },
    {
        infoBits: 0x2379F,
        versionNumber: 35,
        alignmentPatternCenters: [6, 30, 54, 78, 102, 126, 150],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 12, dataCodewordsPerBlock: 121 },
                    { numBlocks: 7, dataCodewordsPerBlock: 122 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 12, dataCodewordsPerBlock: 47 },
                    { numBlocks: 26, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 39, dataCodewordsPerBlock: 24 },
                    { numBlocks: 14, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 22, dataCodewordsPerBlock: 15 },
                    { numBlocks: 41, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x24B0B,
        versionNumber: 36,
        alignmentPatternCenters: [6, 24, 50, 76, 102, 128, 154],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 121 },
                    { numBlocks: 14, dataCodewordsPerBlock: 122 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 47 },
                    { numBlocks: 34, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 46, dataCodewordsPerBlock: 24 },
                    { numBlocks: 10, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 15 },
                    { numBlocks: 64, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x2542E,
        versionNumber: 37,
        alignmentPatternCenters: [6, 28, 54, 80, 106, 132, 158],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 17, dataCodewordsPerBlock: 122 },
                    { numBlocks: 4, dataCodewordsPerBlock: 123 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 29, dataCodewordsPerBlock: 46 },
                    { numBlocks: 14, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 49, dataCodewordsPerBlock: 24 },
                    { numBlocks: 10, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 24, dataCodewordsPerBlock: 15 },
                    { numBlocks: 46, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x26A64,
        versionNumber: 38,
        alignmentPatternCenters: [6, 32, 58, 84, 110, 136, 162],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 122 },
                    { numBlocks: 18, dataCodewordsPerBlock: 123 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 13, dataCodewordsPerBlock: 46 },
                    { numBlocks: 32, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 48, dataCodewordsPerBlock: 24 },
                    { numBlocks: 14, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 42, dataCodewordsPerBlock: 15 },
                    { numBlocks: 32, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x27541,
        versionNumber: 39,
        alignmentPatternCenters: [6, 26, 54, 82, 110, 138, 166],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 20, dataCodewordsPerBlock: 117 },
                    { numBlocks: 4, dataCodewordsPerBlock: 118 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 40, dataCodewordsPerBlock: 47 },
                    { numBlocks: 7, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 43, dataCodewordsPerBlock: 24 },
                    { numBlocks: 22, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 10, dataCodewordsPerBlock: 15 },
                    { numBlocks: 67, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x28C69,
        versionNumber: 40,
        alignmentPatternCenters: [6, 30, 58, 86, 114, 142, 170],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 19, dataCodewordsPerBlock: 118 },
                    { numBlocks: 6, dataCodewordsPerBlock: 119 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 18, dataCodewordsPerBlock: 47 },
                    { numBlocks: 31, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 34, dataCodewordsPerBlock: 24 },
                    { numBlocks: 34, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 20, dataCodewordsPerBlock: 15 },
                    { numBlocks: 61, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
];

_.Sw.VERSIONS=Sw.VERSIONS;
(function (Mode) {
    Mode["Numeric"] = "numeric";
    Mode["Alphanumeric"] = "alphanumeric";
    Mode["Byte"] = "byte";
    Mode["Kanji"] = "kanji";
    Mode["ECI"] = "eci";
    Mode["StructuredAppend"] = "structuredappend";
})(Sw.Mode || (Sw.Mode = {}));

_.Sw.Mode=Sw.Mode;
Sw.BitMatrix=class BitMatrix {
    static createEmpty(width, height) {
        return new Sw.BitMatrix(new Uint8ClampedArray(width * height), width);
    }
    width;
    height;
    data;
    constructor(data, width) {
        this.width = width;
        this.height = data.length / width;
        this.data = data;
    }
    get(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return false;
        }
        return !!this.data[y * this.width + x];
    }
    set(x, y, v) {
        this.data[y * this.width + x] = v ? 1 : 0;
    }
    setRegion(left, top, width, height, v) {
        for (let y = top; y < top + height; y++) {
            for (let x = left; x < left + width; x++) {
                this.set(x, y, !!v);
            }
        }
    }
}
Sw.BitMatrix.Namespace=`QrCodeReader.Sw`;

_.Sw.BitMatrix=Sw.BitMatrix;
Sw.Locator=class Locator {
    static MAX_FINDERPATTERNS_TO_SEARCH = 5;
    static MIN_QUAD_RATIO = 0.5;
    static MAX_QUAD_RATIO = 1.5;
    static distance(a, b) {
        return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
    }
    static sum(values) {
        return values.reduce((a, b) => a + b);
    }
    ;
    static reorderFinderPatterns(pattern1, pattern2, pattern3) {
        const oneTwoDistance = this.distance(pattern1, pattern2);
        const twoThreeDistance = this.distance(pattern2, pattern3);
        const oneThreeDistance = this.distance(pattern1, pattern3);
        let bottomLeft;
        let topLeft;
        let topRight;
        if (twoThreeDistance >= oneTwoDistance && twoThreeDistance >= oneThreeDistance) {
            [bottomLeft, topLeft, topRight] = [pattern2, pattern1, pattern3];
        }
        else if (oneThreeDistance >= twoThreeDistance && oneThreeDistance >= oneTwoDistance) {
            [bottomLeft, topLeft, topRight] = [pattern1, pattern2, pattern3];
        }
        else {
            [bottomLeft, topLeft, topRight] = [pattern1, pattern3, pattern2];
        }
        // Use cross product to figure out whether bottomLeft (A) and topRight (C) are correct or flipped in relation to topLeft (B)
        if (((topRight.x - topLeft.x) * (bottomLeft.y - topLeft.y)) - ((topRight.y - topLeft.y) * (bottomLeft.x - topLeft.x)) < 0) {
            [bottomLeft, topRight] = [topRight, bottomLeft];
        }
        return { bottomLeft, topLeft, topRight };
    }
    // Computes the dimension (number of modules on a side) of the QR Code based on the position of the finder patterns
    static computeDimension(topLeft, topRight, bottomLeft, matrix) {
        const moduleSize = (this.sum(this.countBlackWhiteRun(topLeft, bottomLeft, matrix, 5)) / 7 +
            this.sum(this.countBlackWhiteRun(topLeft, topRight, matrix, 5)) / 7 +
            this.sum(this.countBlackWhiteRun(bottomLeft, topLeft, matrix, 5)) / 7 +
            this.sum(this.countBlackWhiteRun(topRight, topLeft, matrix, 5)) / 7) / 4;
        if (moduleSize < 1) {
            throw new Error("Invalid module size");
        }
        const topDimension = Math.round(this.distance(topLeft, topRight) / moduleSize);
        const sideDimension = Math.round(this.distance(topLeft, bottomLeft) / moduleSize);
        let dimension = Math.floor((topDimension + sideDimension) / 2) + 7;
        switch (dimension % 4) {
            case 0:
                dimension++;
                break;
            case 2:
                dimension--;
                break;
        }
        return { dimension, moduleSize };
    }
    static countBlackWhiteRunTowardsPoint(origin, end, matrix, length) {
        const switchPoints = [{ x: Math.floor(origin.x), y: Math.floor(origin.y) }];
        const steep = Math.abs(end.y - origin.y) > Math.abs(end.x - origin.x);
        let fromX;
        let fromY;
        let toX;
        let toY;
        if (steep) {
            fromX = Math.floor(origin.y);
            fromY = Math.floor(origin.x);
            toX = Math.floor(end.y);
            toY = Math.floor(end.x);
        }
        else {
            fromX = Math.floor(origin.x);
            fromY = Math.floor(origin.y);
            toX = Math.floor(end.x);
            toY = Math.floor(end.y);
        }
        const dx = Math.abs(toX - fromX);
        const dy = Math.abs(toY - fromY);
        let error = Math.floor(-dx / 2);
        const xStep = fromX < toX ? 1 : -1;
        const yStep = fromY < toY ? 1 : -1;
        let currentPixel = true;
        for (let x = fromX, y = fromY; x !== toX + xStep; x += xStep) {
            const realX = steep ? y : x;
            const realY = steep ? x : y;
            if (matrix.get(realX, realY) !== currentPixel) {
                currentPixel = !currentPixel;
                switchPoints.push({ x: realX, y: realY });
                if (switchPoints.length === length + 1) {
                    break;
                }
            }
            error += dy;
            if (error > 0) {
                if (y === toY) {
                    break;
                }
                y += yStep;
                error -= dx;
            }
        }
        const distances = [];
        for (let i = 0; i < length; i++) {
            if (switchPoints[i] && switchPoints[i + 1]) {
                distances.push(this.distance(switchPoints[i], switchPoints[i + 1]));
            }
            else {
                distances.push(0);
            }
        }
        return distances;
    }
    static countBlackWhiteRun(origin, end, matrix, length) {
        const rise = end.y - origin.y;
        const run = end.x - origin.x;
        const towardsEnd = this.countBlackWhiteRunTowardsPoint(origin, end, matrix, Math.ceil(length / 2));
        const awayFromEnd = this.countBlackWhiteRunTowardsPoint(origin, { x: origin.x - run, y: origin.y - rise }, matrix, Math.ceil(length / 2));
        const towardsEndShift = towardsEnd.shift() ?? 0;
        const awayFromEndShift = awayFromEnd.shift() ?? 0;
        const middleValue = towardsEndShift + awayFromEndShift - 1;
        return awayFromEnd.concat(middleValue).concat(...towardsEnd);
    }
    static scoreBlackWhiteRun(sequence, ratios) {
        const averageSize = this.sum(sequence) / this.sum(ratios);
        let error = 0;
        ratios.forEach((ratio, i) => {
            error += (sequence[i] - ratio * averageSize) ** 2;
        });
        return { averageSize, error };
    }
    static scorePattern(point, ratios, matrix) {
        try {
            const horizontalRun = this.countBlackWhiteRun(point, { x: -1, y: point.y }, matrix, ratios.length);
            const verticalRun = this.countBlackWhiteRun(point, { x: point.x, y: -1 }, matrix, ratios.length);
            const topLeftPoint = {
                x: Math.max(0, point.x - point.y) - 1,
                y: Math.max(0, point.y - point.x) - 1,
            };
            const topLeftBottomRightRun = this.countBlackWhiteRun(point, topLeftPoint, matrix, ratios.length);
            const bottomLeftPoint = {
                x: Math.min(matrix.width, point.x + point.y) + 1,
                y: Math.min(matrix.height, point.y + point.x) + 1,
            };
            const bottomLeftTopRightRun = this.countBlackWhiteRun(point, bottomLeftPoint, matrix, ratios.length);
            const horzError = this.scoreBlackWhiteRun(horizontalRun, ratios);
            const vertError = this.scoreBlackWhiteRun(verticalRun, ratios);
            const diagDownError = this.scoreBlackWhiteRun(topLeftBottomRightRun, ratios);
            const diagUpError = this.scoreBlackWhiteRun(bottomLeftTopRightRun, ratios);
            const ratioError = Math.sqrt(horzError.error * horzError.error +
                vertError.error * vertError.error +
                diagDownError.error * diagDownError.error +
                diagUpError.error * diagUpError.error);
            const avgSize = (horzError.averageSize + vertError.averageSize + diagDownError.averageSize + diagUpError.averageSize) / 4;
            const sizeError = ((horzError.averageSize - avgSize) ** 2 +
                (vertError.averageSize - avgSize) ** 2 +
                (diagDownError.averageSize - avgSize) ** 2 +
                (diagUpError.averageSize - avgSize) ** 2) / avgSize;
            return ratioError + sizeError;
        }
        catch {
            return Infinity;
        }
    }
    static recenterLocation(matrix, p) {
        let leftX = Math.round(p.x);
        while (matrix.get(leftX, Math.round(p.y))) {
            leftX--;
        }
        let rightX = Math.round(p.x);
        while (matrix.get(rightX, Math.round(p.y))) {
            rightX++;
        }
        const x = (leftX + rightX) / 2;
        let topY = Math.round(p.y);
        while (matrix.get(Math.round(x), topY)) {
            topY--;
        }
        let bottomY = Math.round(p.y);
        while (matrix.get(Math.round(x), bottomY)) {
            bottomY++;
        }
        const y = (topY + bottomY) / 2;
        return { x, y };
    }
    static locate(matrix) {
        const finderPatternQuads = [];
        let activeFinderPatternQuads = [];
        const alignmentPatternQuads = [];
        let activeAlignmentPatternQuads = [];
        for (let y = 0; y <= matrix.height; y++) {
            let length = 0;
            let lastBit = false;
            let scans = [0, 0, 0, 0, 0];
            for (let x = -1; x <= matrix.width; x++) {
                const v = matrix.get(x, y);
                if (v === lastBit) {
                    length++;
                }
                else {
                    scans = [scans[1], scans[2], scans[3], scans[4], length];
                    length = 1;
                    lastBit = v;
                    const averageFinderPatternBlocksize = this.sum(scans) / 7;
                    const validFinderPattern = Math.abs(scans[0] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize &&
                        Math.abs(scans[1] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize &&
                        Math.abs(scans[2] - 3 * averageFinderPatternBlocksize) < 3 * averageFinderPatternBlocksize &&
                        Math.abs(scans[3] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize &&
                        Math.abs(scans[4] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize &&
                        !v;
                    const averageAlignmentPatternBlocksize = this.sum(scans.slice(-3)) / 3;
                    const validAlignmentPattern = Math.abs(scans[2] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize &&
                        Math.abs(scans[3] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize &&
                        Math.abs(scans[4] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize &&
                        v;
                    if (validFinderPattern) {
                        const endX = x - scans[3] - scans[4];
                        const startX = endX - scans[2];
                        const line = { startX, endX, y };
                        const matchingQuads = activeFinderPatternQuads.filter(q => (startX >= q.bottom.startX && startX <= q.bottom.endX) ||
                            (endX >= q.bottom.startX && startX <= q.bottom.endX) ||
                            (startX <= q.bottom.startX && endX >= q.bottom.endX && ((scans[2] / (q.bottom.endX - q.bottom.startX)) < this.MAX_QUAD_RATIO &&
                                (scans[2] / (q.bottom.endX - q.bottom.startX)) > this.MIN_QUAD_RATIO)));
                        if (matchingQuads.length > 0) {
                            matchingQuads[0].bottom = line;
                        }
                        else {
                            activeFinderPatternQuads.push({ top: line, bottom: line });
                        }
                    }
                    if (validAlignmentPattern) {
                        const endX = x - scans[4];
                        const startX = endX - scans[3];
                        const line = { startX, y, endX };
                        const matchingQuads = activeAlignmentPatternQuads.filter(q => (startX >= q.bottom.startX && startX <= q.bottom.endX) ||
                            (endX >= q.bottom.startX && startX <= q.bottom.endX) ||
                            (startX <= q.bottom.startX && endX >= q.bottom.endX && ((scans[2] / (q.bottom.endX - q.bottom.startX)) < this.MAX_QUAD_RATIO &&
                                (scans[2] / (q.bottom.endX - q.bottom.startX)) > this.MIN_QUAD_RATIO)));
                        if (matchingQuads.length > 0) {
                            matchingQuads[0].bottom = line;
                        }
                        else {
                            activeAlignmentPatternQuads.push({ top: line, bottom: line });
                        }
                    }
                }
            }
            finderPatternQuads.push(...activeFinderPatternQuads.filter(q => q.bottom.y !== y && q.bottom.y - q.top.y >= 2));
            activeFinderPatternQuads = activeFinderPatternQuads.filter(q => q.bottom.y === y);
            alignmentPatternQuads.push(...activeAlignmentPatternQuads.filter(q => q.bottom.y !== y));
            activeAlignmentPatternQuads = activeAlignmentPatternQuads.filter(q => q.bottom.y === y);
        }
        finderPatternQuads.push(...activeFinderPatternQuads.filter(q => q.bottom.y - q.top.y >= 2));
        alignmentPatternQuads.push(...activeAlignmentPatternQuads);
        // Refactored from cozmo/jsQR to (hopefully) circumvent an issue in Safari 13+ on both Mac and iOS (also including
        // iOS Chrome and other Safari iOS derivatives). Safari was very occasionally and apparently not deterministically
        // .map of the original code (here the second for-loop). This second .map contained a nested .map call over the same
        const scoredFinderPatternPositions = [];
        for (const quad of finderPatternQuads) {
            if (quad.bottom.y - quad.top.y < 2) {
                continue;
            }
            const x = (quad.top.startX + quad.top.endX + quad.bottom.startX + quad.bottom.endX) / 4;
            const y = (quad.top.y + quad.bottom.y + 1) / 2;
            if (!matrix.get(Math.round(x), Math.round(y))) {
                continue;
            }
            const lengths = [quad.top.endX - quad.top.startX, quad.bottom.endX - quad.bottom.startX, quad.bottom.y - quad.top.y + 1];
            const size = this.sum(lengths) / lengths.length;
            const score = this.scorePattern({ x: Math.round(x), y: Math.round(y) }, [1, 1, 3, 1, 1], matrix);
            scoredFinderPatternPositions.push({ score, x, y, size });
        }
        if (scoredFinderPatternPositions.length < 3) {
            return null;
        }
        scoredFinderPatternPositions.sort((a, b) => a.score - b.score);
        const finderPatternGroups = [];
        for (let i = 0; i < Math.min(scoredFinderPatternPositions.length, this.MAX_FINDERPATTERNS_TO_SEARCH); ++i) {
            const point = scoredFinderPatternPositions[i];
            const otherPoints = [];
            for (const otherPoint of scoredFinderPatternPositions) {
                if (otherPoint === point) {
                    continue;
                }
                otherPoints.push({
                    ...otherPoint,
                    score: otherPoint.score + ((otherPoint.size - point.size) ** 2) / point.size,
                });
            }
            otherPoints.sort((a, b) => a.score - b.score);
            finderPatternGroups.push({
                points: [point, otherPoints[0], otherPoints[1]],
                score: point.score + otherPoints[0].score + otherPoints[1].score,
            });
        }
        finderPatternGroups.sort((a, b) => a.score - b.score);
        const bestFinderPatternGroup = finderPatternGroups[0];
        const { topRight, topLeft, bottomLeft } = this.reorderFinderPatterns(...bestFinderPatternGroup.points);
        const alignment = this.findAlignmentPattern(matrix, alignmentPatternQuads, topRight, topLeft, bottomLeft);
        const result = [];
        if (alignment) {
            result.push({
                alignmentPattern: { x: alignment.alignmentPattern.x, y: alignment.alignmentPattern.y },
                bottomLeft: { x: bottomLeft.x, y: bottomLeft.y },
                dimension: alignment.dimension,
                topLeft: { x: topLeft.x, y: topLeft.y },
                topRight: { x: topRight.x, y: topRight.y },
            });
        }
        const midTopRight = this.recenterLocation(matrix, topRight);
        const midTopLeft = this.recenterLocation(matrix, topLeft);
        const midBottomLeft = this.recenterLocation(matrix, bottomLeft);
        const centeredAlignment = this.findAlignmentPattern(matrix, alignmentPatternQuads, midTopRight, midTopLeft, midBottomLeft);
        if (centeredAlignment) {
            result.push({
                alignmentPattern: { x: centeredAlignment.alignmentPattern.x, y: centeredAlignment.alignmentPattern.y },
                bottomLeft: { x: midBottomLeft.x, y: midBottomLeft.y },
                topLeft: { x: midTopLeft.x, y: midTopLeft.y },
                topRight: { x: midTopRight.x, y: midTopRight.y },
                dimension: centeredAlignment.dimension,
            });
        }
        if (result.length === 0) {
            return null;
        }
        return result;
    }
    static findAlignmentPattern(matrix, alignmentPatternQuads, topRight, topLeft, bottomLeft) {
        let dimension;
        let moduleSize;
        try {
            ({ dimension, moduleSize } = this.computeDimension(topLeft, topRight, bottomLeft, matrix));
        }
        catch (e) {
            return null;
        }
        const bottomRightFinderPattern = {
            x: topRight.x - topLeft.x + bottomLeft.x,
            y: topRight.y - topLeft.y + bottomLeft.y,
        };
        const modulesBetweenFinderPatterns = ((this.distance(topLeft, bottomLeft) + this.distance(topLeft, topRight)) / 2 / moduleSize);
        const correctionToTopLeft = 1 - (3 / modulesBetweenFinderPatterns);
        const expectedAlignmentPattern = {
            x: topLeft.x + correctionToTopLeft * (bottomRightFinderPattern.x - topLeft.x),
            y: topLeft.y + correctionToTopLeft * (bottomRightFinderPattern.y - topLeft.y),
        };
        const alignmentPatterns = alignmentPatternQuads
            .map(q => {
            const x = (q.top.startX + q.top.endX + q.bottom.startX + q.bottom.endX) / 4;
            const y = (q.top.y + q.bottom.y + 1) / 2;
            if (!matrix.get(Math.floor(x), Math.floor(y))) {
                return;
            }
            const sizeScore = this.scorePattern({ x: Math.floor(x), y: Math.floor(y) }, [1, 1, 1], matrix);
            const score = sizeScore + this.distance({ x, y }, expectedAlignmentPattern);
            return { x, y, score };
        })
            .filter(v => !!v);
        alignmentPatterns.sort((a, b) => a.score - b.score);
        const alignmentPattern = modulesBetweenFinderPatterns >= 15 && alignmentPatterns.length ? alignmentPatterns[0] : expectedAlignmentPattern;
        return { alignmentPattern, dimension };
    }
}
Sw.Locator.Namespace=`QrCodeReader.Sw`;

_.Sw.Locator=Sw.Locator;
Sw.Exctractor=class Exctractor {
    static squareToQuadrilateral(p1, p2, p3, p4) {
        const dx3 = p1.x - p2.x + p3.x - p4.x;
        const dy3 = p1.y - p2.y + p3.y - p4.y;
        if (dx3 === 0 && dy3 === 0) {
            return {
                a11: p2.x - p1.x,
                a12: p2.y - p1.y,
                a13: 0,
                a21: p3.x - p2.x,
                a22: p3.y - p2.y,
                a23: 0,
                a31: p1.x,
                a32: p1.y,
                a33: 1,
            };
        }
        else {
            const dx1 = p2.x - p3.x;
            const dx2 = p4.x - p3.x;
            const dy1 = p2.y - p3.y;
            const dy2 = p4.y - p3.y;
            const denominator = dx1 * dy2 - dx2 * dy1;
            const a13 = (dx3 * dy2 - dx2 * dy3) / denominator;
            const a23 = (dx1 * dy3 - dx3 * dy1) / denominator;
            return {
                a11: p2.x - p1.x + a13 * p2.x,
                a12: p2.y - p1.y + a13 * p2.y,
                a13,
                a21: p4.x - p1.x + a23 * p4.x,
                a22: p4.y - p1.y + a23 * p4.y,
                a23,
                a31: p1.x,
                a32: p1.y,
                a33: 1,
            };
        }
    }
    static quadrilateralToSquare(p1, p2, p3, p4) {
        const sToQ = this.squareToQuadrilateral(p1, p2, p3, p4);
        return {
            a11: sToQ.a22 * sToQ.a33 - sToQ.a23 * sToQ.a32,
            a12: sToQ.a13 * sToQ.a32 - sToQ.a12 * sToQ.a33,
            a13: sToQ.a12 * sToQ.a23 - sToQ.a13 * sToQ.a22,
            a21: sToQ.a23 * sToQ.a31 - sToQ.a21 * sToQ.a33,
            a22: sToQ.a11 * sToQ.a33 - sToQ.a13 * sToQ.a31,
            a23: sToQ.a13 * sToQ.a21 - sToQ.a11 * sToQ.a23,
            a31: sToQ.a21 * sToQ.a32 - sToQ.a22 * sToQ.a31,
            a32: sToQ.a12 * sToQ.a31 - sToQ.a11 * sToQ.a32,
            a33: sToQ.a11 * sToQ.a22 - sToQ.a12 * sToQ.a21,
        };
    }
    static times(a, b) {
        return {
            a11: a.a11 * b.a11 + a.a21 * b.a12 + a.a31 * b.a13,
            a12: a.a12 * b.a11 + a.a22 * b.a12 + a.a32 * b.a13,
            a13: a.a13 * b.a11 + a.a23 * b.a12 + a.a33 * b.a13,
            a21: a.a11 * b.a21 + a.a21 * b.a22 + a.a31 * b.a23,
            a22: a.a12 * b.a21 + a.a22 * b.a22 + a.a32 * b.a23,
            a23: a.a13 * b.a21 + a.a23 * b.a22 + a.a33 * b.a23,
            a31: a.a11 * b.a31 + a.a21 * b.a32 + a.a31 * b.a33,
            a32: a.a12 * b.a31 + a.a22 * b.a32 + a.a32 * b.a33,
            a33: a.a13 * b.a31 + a.a23 * b.a32 + a.a33 * b.a33,
        };
    }
    static extract(image, location) {
        const qToS = this.quadrilateralToSquare({ x: 3.5, y: 3.5 }, { x: location.dimension - 3.5, y: 3.5 }, { x: location.dimension - 6.5, y: location.dimension - 6.5 }, { x: 3.5, y: location.dimension - 3.5 });
        const sToQ = this.squareToQuadrilateral(location.topLeft, location.topRight, location.alignmentPattern, location.bottomLeft);
        const transform = this.times(sToQ, qToS);
        const matrix = Sw.BitMatrix.createEmpty(location.dimension, location.dimension);
        const mappingFunction = (x, y) => {
            const denominator = transform.a13 * x + transform.a23 * y + transform.a33;
            return {
                x: (transform.a11 * x + transform.a21 * y + transform.a31) / denominator,
                y: (transform.a12 * x + transform.a22 * y + transform.a32) / denominator,
            };
        };
        for (let y = 0; y < location.dimension; y++) {
            for (let x = 0; x < location.dimension; x++) {
                const xValue = x + 0.5;
                const yValue = y + 0.5;
                const sourcePixel = mappingFunction(xValue, yValue);
                matrix.set(x, y, image.get(Math.floor(sourcePixel.x), Math.floor(sourcePixel.y)));
            }
        }
        return {
            matrix,
            mappingFunction,
        };
    }
}
Sw.Exctractor.Namespace=`QrCodeReader.Sw`;

_.Sw.Exctractor=Sw.Exctractor;
Sw.GenericGFPoly=class GenericGFPoly {
    field;
    coefficients;
    constructor(field, coefficients) {
        if (coefficients.length === 0) {
            throw new Error("No coefficients.");
        }
        this.field = field;
        const coefficientsLength = coefficients.length;
        if (coefficientsLength > 1 && coefficients[0] === 0) {
            let firstNonZero = 1;
            while (firstNonZero < coefficientsLength && coefficients[firstNonZero] === 0) {
                firstNonZero++;
            }
            if (firstNonZero === coefficientsLength) {
                this.coefficients = field.zero.coefficients;
            }
            else {
                this.coefficients = new Uint8ClampedArray(coefficientsLength - firstNonZero);
                for (let i = 0; i < this.coefficients.length; i++) {
                    this.coefficients[i] = coefficients[firstNonZero + i];
                }
            }
        }
        else {
            this.coefficients = coefficients;
        }
    }
    degree() {
        return this.coefficients.length - 1;
    }
    isZero() {
        return this.coefficients[0] === 0;
    }
    getCoefficient(degree) {
        return this.coefficients[this.coefficients.length - 1 - degree];
    }
    addOrSubtract(other) {
        if (this.isZero()) {
            return other;
        }
        if (other.isZero()) {
            return this;
        }
        let smallerCoefficients = this.coefficients;
        let largerCoefficients = other.coefficients;
        if (smallerCoefficients.length > largerCoefficients.length) {
            [smallerCoefficients, largerCoefficients] = [largerCoefficients, smallerCoefficients];
        }
        const sumDiff = new Uint8ClampedArray(largerCoefficients.length);
        const lengthDiff = largerCoefficients.length - smallerCoefficients.length;
        for (let i = 0; i < lengthDiff; i++) {
            sumDiff[i] = largerCoefficients[i];
        }
        for (let i = lengthDiff; i < largerCoefficients.length; i++) {
            sumDiff[i] = Sw.addOrSubtractGF(smallerCoefficients[i - lengthDiff], largerCoefficients[i]);
        }
        return new Sw.GenericGFPoly(this.field, sumDiff);
    }
    multiply(scalar) {
        if (scalar === 0) {
            return this.field.zero;
        }
        if (scalar === 1) {
            return this;
        }
        const size = this.coefficients.length;
        const product = new Uint8ClampedArray(size);
        for (let i = 0; i < size; i++) {
            product[i] = this.field.multiply(this.coefficients[i], scalar);
        }
        return new Sw.GenericGFPoly(this.field, product);
    }
    multiplyPoly(other) {
        if (this.isZero() || other.isZero()) {
            return this.field.zero;
        }
        const aCoefficients = this.coefficients;
        const aLength = aCoefficients.length;
        const bCoefficients = other.coefficients;
        const bLength = bCoefficients.length;
        const product = new Uint8ClampedArray(aLength + bLength - 1);
        for (let i = 0; i < aLength; i++) {
            const aCoeff = aCoefficients[i];
            for (let j = 0; j < bLength; j++) {
                product[i + j] = Sw.addOrSubtractGF(product[i + j], this.field.multiply(aCoeff, bCoefficients[j]));
            }
        }
        return new Sw.GenericGFPoly(this.field, product);
    }
    multiplyByMonomial(degree, coefficient) {
        if (degree < 0) {
            throw new Error("Invalid degree less than 0");
        }
        if (coefficient === 0) {
            return this.field.zero;
        }
        const size = this.coefficients.length;
        const product = new Uint8ClampedArray(size + degree);
        for (let i = 0; i < size; i++) {
            product[i] = this.field.multiply(this.coefficients[i], coefficient);
        }
        return new Sw.GenericGFPoly(this.field, product);
    }
    evaluateAt(a) {
        let result = 0;
        if (a === 0) {
            return this.getCoefficient(0);
        }
        const size = this.coefficients.length;
        if (a === 1) {
            this.coefficients.forEach((coefficient) => {
                result = Sw.addOrSubtractGF(result, coefficient);
            });
            return result;
        }
        result = this.coefficients[0];
        for (let i = 1; i < size; i++) {
            result = Sw.addOrSubtractGF(this.field.multiply(a, result), this.coefficients[i]);
        }
        return result;
    }
}
Sw.GenericGFPoly.Namespace=`QrCodeReader.Sw`;

_.Sw.GenericGFPoly=Sw.GenericGFPoly;
Sw.GenericGF=class GenericGF {
    primitive;
    size;
    generatorBase;
    zero;
    one;
    expTable;
    logTable;
    constructor(primitive, size, genBase) {
        this.primitive = primitive;
        this.size = size;
        this.generatorBase = genBase;
        this.expTable = new Array(this.size);
        this.logTable = new Array(this.size);
        let x = 1;
        for (let i = 0; i < this.size; i++) {
            this.expTable[i] = x;
            x = x * 2;
            if (x >= this.size) {
                x = (x ^ this.primitive) & (this.size - 1);
            }
        }
        for (let i = 0; i < this.size - 1; i++) {
            this.logTable[this.expTable[i]] = i;
        }
        this.zero = new Sw.GenericGFPoly(this, Uint8ClampedArray.from([0]));
        this.one = new Sw.GenericGFPoly(this, Uint8ClampedArray.from([1]));
    }
    multiply(a, b) {
        if (a === 0 || b === 0) {
            return 0;
        }
        return this.expTable[(this.logTable[a] + this.logTable[b]) % (this.size - 1)];
    }
    inverse(a) {
        if (a === 0) {
            throw new Error("Can't invert 0");
        }
        return this.expTable[this.size - this.logTable[a] - 1];
    }
    buildMonomial(degree, coefficient) {
        if (degree < 0) {
            throw new Error("Invalid monomial degree less than 0");
        }
        if (coefficient === 0) {
            return this.zero;
        }
        const coefficients = new Uint8ClampedArray(degree + 1);
        coefficients[0] = coefficient;
        return new Sw.GenericGFPoly(this, coefficients);
    }
    log(a) {
        if (a === 0) {
            throw new Error("Can't take log(0)");
        }
        return this.logTable[a];
    }
    exp(a) {
        return this.expTable[a];
    }
}
Sw.GenericGF.Namespace=`QrCodeReader.Sw`;

_.Sw.GenericGF=Sw.GenericGF;
Sw.Reedsolomon=class Reedsolomon {
    static runEuclideanAlgorithm(field, a, b, R) {
        if (a.degree() < b.degree()) {
            [a, b] = [b, a];
        }
        let rLast = a;
        let r = b;
        let tLast = field.zero;
        let t = field.one;
        while (r.degree() >= R / 2) {
            const rLastLast = rLast;
            const tLastLast = tLast;
            rLast = r;
            tLast = t;
            if (rLast.isZero()) {
                return null;
            }
            r = rLastLast;
            let q = field.zero;
            const denominatorLeadingTerm = rLast.getCoefficient(rLast.degree());
            const dltInverse = field.inverse(denominatorLeadingTerm);
            while (r.degree() >= rLast.degree() && !r.isZero()) {
                const degreeDiff = r.degree() - rLast.degree();
                const scale = field.multiply(r.getCoefficient(r.degree()), dltInverse);
                q = q.addOrSubtract(field.buildMonomial(degreeDiff, scale));
                r = r.addOrSubtract(rLast.multiplyByMonomial(degreeDiff, scale));
            }
            t = q.multiplyPoly(tLast).addOrSubtract(tLastLast);
            if (r.degree() >= rLast.degree()) {
                return null;
            }
        }
        const sigmaTildeAtZero = t.getCoefficient(0);
        if (sigmaTildeAtZero === 0) {
            return null;
        }
        const inverse = field.inverse(sigmaTildeAtZero);
        return [t.multiply(inverse), r.multiply(inverse)];
    }
    static findErrorLocations(field, errorLocator) {
        const numErrors = errorLocator.degree();
        if (numErrors === 1) {
            return [errorLocator.getCoefficient(1)];
        }
        const result = new Array(numErrors);
        let errorCount = 0;
        for (let i = 1; i < field.size && errorCount < numErrors; i++) {
            if (errorLocator.evaluateAt(i) === 0) {
                result[errorCount] = field.inverse(i);
                errorCount++;
            }
        }
        if (errorCount !== numErrors) {
            return null;
        }
        return result;
    }
    static findErrorMagnitudes(field, errorEvaluator, errorLocations) {
        const s = errorLocations.length;
        const result = new Array(s);
        for (let i = 0; i < s; i++) {
            const xiInverse = field.inverse(errorLocations[i]);
            let denominator = 1;
            for (let j = 0; j < s; j++) {
                if (i !== j) {
                    denominator = field.multiply(denominator, Sw.addOrSubtractGF(1, field.multiply(errorLocations[j], xiInverse)));
                }
            }
            result[i] = field.multiply(errorEvaluator.evaluateAt(xiInverse), field.inverse(denominator));
            if (field.generatorBase !== 0) {
                result[i] = field.multiply(result[i], xiInverse);
            }
        }
        return result;
    }
    static decode(bytes, twoS) {
        const outputBytes = new Uint8ClampedArray(bytes.length);
        outputBytes.set(bytes);
        const field = new Sw.GenericGF(0x011D, 256, 0);
        const poly = new Sw.GenericGFPoly(field, outputBytes);
        const syndromeCoefficients = new Uint8ClampedArray(twoS);
        let error = false;
        for (let s = 0; s < twoS; s++) {
            const evaluation = poly.evaluateAt(field.exp(s + field.generatorBase));
            syndromeCoefficients[syndromeCoefficients.length - 1 - s] = evaluation;
            if (evaluation !== 0) {
                error = true;
            }
        }
        if (!error) {
            return outputBytes;
        }
        const syndrome = new Sw.GenericGFPoly(field, syndromeCoefficients);
        const sigmaOmega = this.runEuclideanAlgorithm(field, field.buildMonomial(twoS, 1), syndrome, twoS);
        if (sigmaOmega === null) {
            return null;
        }
        const errorLocations = this.findErrorLocations(field, sigmaOmega[0]);
        if (errorLocations == null) {
            return null;
        }
        const errorMagnitudes = this.findErrorMagnitudes(field, sigmaOmega[1], errorLocations);
        for (let i = 0; i < errorLocations.length; i++) {
            const position = outputBytes.length - 1 - field.log(errorLocations[i]);
            if (position < 0) {
                return null;
            }
            outputBytes[position] = Sw.addOrSubtractGF(outputBytes[position], errorMagnitudes[i]);
        }
        return outputBytes;
    }
}
Sw.Reedsolomon.Namespace=`QrCodeReader.Sw`;

_.Sw.Reedsolomon=Sw.Reedsolomon;
Sw.DecodeData=class DecodeData {
    static AlphanumericCharacterCodes = [
        "0", "1", "2", "3", "4", "5", "6", "7", "8",
        "9", "A", "B", "C", "D", "E", "F", "G", "H",
        "I", "J", "K", "L", "M", "N", "O", "P", "Q",
        "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        " ", "$", "%", "*", "+", "-", ".", "/", ":",
    ];
    static decodeNumeric(stream, size) {
        const bytes = [];
        let text = "";
        const characterCountSize = [10, 12, 14][size];
        let length = stream.readBits(characterCountSize);
        while (length >= 3) {
            const num = stream.readBits(10);
            if (num >= 1000) {
                throw new Error("Invalid numeric value above 999");
            }
            const a = Math.floor(num / 100);
            const b = Math.floor(num / 10) % 10;
            const c = num % 10;
            bytes.push(48 + a, 48 + b, 48 + c);
            text += a.toString() + b.toString() + c.toString();
            length -= 3;
        }
        if (length === 2) {
            const num = stream.readBits(7);
            if (num >= 100) {
                throw new Error("Invalid numeric value above 99");
            }
            const a = Math.floor(num / 10);
            const b = num % 10;
            bytes.push(48 + a, 48 + b);
            text += a.toString() + b.toString();
        }
        else if (length === 1) {
            const num = stream.readBits(4);
            if (num >= 10) {
                throw new Error("Invalid numeric value above 9");
            }
            bytes.push(48 + num);
            text += num.toString();
        }
        return { bytes, text };
    }
    static decodeAlphanumeric(stream, size) {
        const bytes = [];
        let text = "";
        const characterCountSize = [9, 11, 13][size];
        let length = stream.readBits(characterCountSize);
        while (length >= 2) {
            const v = stream.readBits(11);
            const a = Math.floor(v / 45);
            const b = v % 45;
            bytes.push(this.AlphanumericCharacterCodes[a].charCodeAt(0), this.AlphanumericCharacterCodes[b].charCodeAt(0));
            text += this.AlphanumericCharacterCodes[a] + this.AlphanumericCharacterCodes[b];
            length -= 2;
        }
        if (length === 1) {
            const a = stream.readBits(6);
            bytes.push(this.AlphanumericCharacterCodes[a].charCodeAt(0));
            text += this.AlphanumericCharacterCodes[a];
        }
        return { bytes, text };
    }
    static decodeByte(stream, size) {
        const bytes = [];
        let text = "";
        const characterCountSize = [8, 16, 16][size];
        const length = stream.readBits(characterCountSize);
        for (let i = 0; i < length; i++) {
            const b = stream.readBits(8);
            bytes.push(b);
        }
        try {
            text += decodeURIComponent(bytes.map(b => `%${("0" + b.toString(16)).substr(-2)}`).join(""));
        }
        catch {
        }
        return { bytes, text };
    }
    static decodeKanji(stream, size) {
        const bytes = [];
        const characterCountSize = [8, 10, 12][size];
        const length = stream.readBits(characterCountSize);
        for (let i = 0; i < length; i++) {
            const k = stream.readBits(13);
            let c = (Math.floor(k / 0xC0) << 8) | (k % 0xC0);
            if (c < 0x1F00) {
                c += 0x8140;
            }
            else {
                c += 0xC140;
            }
            bytes.push(c >> 8, c & 0xFF);
        }
        const text = new TextDecoder("shift-jis").decode(Uint8Array.from(bytes));
        return { bytes, text };
    }
    static decode(data, version) {
        const stream = new Sw.BitStream(data);
        // There are 3 'sizes' based on the version. 1-9 is small (0), 10-26 is medium (1) and 27-40 is large (2).
        const size = version <= 9 ? 0 : version <= 26 ? 1 : 2;
        const result = {
            text: "",
            bytes: [],
            chunks: [],
            version,
        };
        while (stream.available() >= 4) {
            const mode = stream.readBits(4);
            if (mode === Sw.ModeByte.Terminator) {
                return result;
            }
            else if (mode === Sw.ModeByte.ECI) {
                if (stream.readBits(1) === 0) {
                    result.chunks.push({
                        type: Sw.Mode.ECI,
                        assignmentNumber: stream.readBits(7),
                    });
                }
                else if (stream.readBits(1) === 0) {
                    result.chunks.push({
                        type: Sw.Mode.ECI,
                        assignmentNumber: stream.readBits(14),
                    });
                }
                else if (stream.readBits(1) === 0) {
                    result.chunks.push({
                        type: Sw.Mode.ECI,
                        assignmentNumber: stream.readBits(21),
                    });
                }
                else {
                    result.chunks.push({
                        type: Sw.Mode.ECI,
                        assignmentNumber: -1,
                    });
                }
            }
            else if (mode === Sw.ModeByte.Numeric) {
                const numericResult = this.decodeNumeric(stream, size);
                result.text += numericResult.text;
                result.bytes.push(...numericResult.bytes);
                result.chunks.push({
                    type: Sw.Mode.Numeric,
                    text: numericResult.text,
                });
            }
            else if (mode === Sw.ModeByte.Alphanumeric) {
                const alphanumericResult = this.decodeAlphanumeric(stream, size);
                result.text += alphanumericResult.text;
                result.bytes.push(...alphanumericResult.bytes);
                result.chunks.push({
                    type: Sw.Mode.Alphanumeric,
                    text: alphanumericResult.text,
                });
            }
            else if (mode === Sw.ModeByte.Byte) {
                const byteResult = this.decodeByte(stream, size);
                result.text += byteResult.text;
                result.bytes.push(...byteResult.bytes);
                result.chunks.push({
                    type: Sw.Mode.Byte,
                    bytes: byteResult.bytes,
                    text: byteResult.text,
                });
            }
            else if (mode === Sw.ModeByte.Kanji) {
                const kanjiResult = this.decodeKanji(stream, size);
                result.text += kanjiResult.text;
                result.bytes.push(...kanjiResult.bytes);
                result.chunks.push({
                    type: Sw.Mode.Kanji,
                    bytes: kanjiResult.bytes,
                    text: kanjiResult.text,
                });
            }
            else if (mode === Sw.ModeByte.StructuredAppend) {
                result.chunks.push({
                    type: Sw.Mode.StructuredAppend,
                    currentSequence: stream.readBits(4),
                    totalSequence: stream.readBits(4),
                    parity: stream.readBits(8),
                });
            }
        }
        if (stream.available() === 0 || stream.readBits(stream.available()) === 0) {
            return result;
        }
        return null;
    }
}
Sw.DecodeData.Namespace=`QrCodeReader.Sw`;

_.Sw.DecodeData=Sw.DecodeData;
Sw.Decoder=class Decoder {
    static numBitsDiffering(x, y) {
        let z = x ^ y;
        let bitCount = 0;
        while (z) {
            bitCount++;
            z &= z - 1;
        }
        return bitCount;
    }
    static pushBit(bit, byte) {
        return (byte << 1) | bit;
    }
    static FORMAT_INFO_TABLE = [
        { bits: 0x5412, formatInfo: { errorCorrectionLevel: 1, dataMask: 0 } },
        { bits: 0x5125, formatInfo: { errorCorrectionLevel: 1, dataMask: 1 } },
        { bits: 0x5E7C, formatInfo: { errorCorrectionLevel: 1, dataMask: 2 } },
        { bits: 0x5B4B, formatInfo: { errorCorrectionLevel: 1, dataMask: 3 } },
        { bits: 0x45F9, formatInfo: { errorCorrectionLevel: 1, dataMask: 4 } },
        { bits: 0x40CE, formatInfo: { errorCorrectionLevel: 1, dataMask: 5 } },
        { bits: 0x4F97, formatInfo: { errorCorrectionLevel: 1, dataMask: 6 } },
        { bits: 0x4AA0, formatInfo: { errorCorrectionLevel: 1, dataMask: 7 } },
        { bits: 0x77C4, formatInfo: { errorCorrectionLevel: 0, dataMask: 0 } },
        { bits: 0x72F3, formatInfo: { errorCorrectionLevel: 0, dataMask: 1 } },
        { bits: 0x7DAA, formatInfo: { errorCorrectionLevel: 0, dataMask: 2 } },
        { bits: 0x789D, formatInfo: { errorCorrectionLevel: 0, dataMask: 3 } },
        { bits: 0x662F, formatInfo: { errorCorrectionLevel: 0, dataMask: 4 } },
        { bits: 0x6318, formatInfo: { errorCorrectionLevel: 0, dataMask: 5 } },
        { bits: 0x6C41, formatInfo: { errorCorrectionLevel: 0, dataMask: 6 } },
        { bits: 0x6976, formatInfo: { errorCorrectionLevel: 0, dataMask: 7 } },
        { bits: 0x1689, formatInfo: { errorCorrectionLevel: 3, dataMask: 0 } },
        { bits: 0x13BE, formatInfo: { errorCorrectionLevel: 3, dataMask: 1 } },
        { bits: 0x1CE7, formatInfo: { errorCorrectionLevel: 3, dataMask: 2 } },
        { bits: 0x19D0, formatInfo: { errorCorrectionLevel: 3, dataMask: 3 } },
        { bits: 0x0762, formatInfo: { errorCorrectionLevel: 3, dataMask: 4 } },
        { bits: 0x0255, formatInfo: { errorCorrectionLevel: 3, dataMask: 5 } },
        { bits: 0x0D0C, formatInfo: { errorCorrectionLevel: 3, dataMask: 6 } },
        { bits: 0x083B, formatInfo: { errorCorrectionLevel: 3, dataMask: 7 } },
        { bits: 0x355F, formatInfo: { errorCorrectionLevel: 2, dataMask: 0 } },
        { bits: 0x3068, formatInfo: { errorCorrectionLevel: 2, dataMask: 1 } },
        { bits: 0x3F31, formatInfo: { errorCorrectionLevel: 2, dataMask: 2 } },
        { bits: 0x3A06, formatInfo: { errorCorrectionLevel: 2, dataMask: 3 } },
        { bits: 0x24B4, formatInfo: { errorCorrectionLevel: 2, dataMask: 4 } },
        { bits: 0x2183, formatInfo: { errorCorrectionLevel: 2, dataMask: 5 } },
        { bits: 0x2EDA, formatInfo: { errorCorrectionLevel: 2, dataMask: 6 } },
        { bits: 0x2BED, formatInfo: { errorCorrectionLevel: 2, dataMask: 7 } },
    ];
    static DATA_MASKS = [
        (p) => ((p.y + p.x) % 2) === 0,
        (p) => (p.y % 2) === 0,
        (p) => p.x % 3 === 0,
        (p) => (p.y + p.x) % 3 === 0,
        (p) => (Math.floor(p.y / 2) + Math.floor(p.x / 3)) % 2 === 0,
        (p) => ((p.x * p.y) % 2) + ((p.x * p.y) % 3) === 0,
        (p) => ((((p.y * p.x) % 2) + (p.y * p.x) % 3) % 2) === 0,
        (p) => ((((p.y + p.x) % 2) + (p.y * p.x) % 3) % 2) === 0,
    ];
    static buildFunctionPatternMask(version) {
        const dimension = 17 + 4 * version.versionNumber;
        const matrix = Sw.BitMatrix.createEmpty(dimension, dimension);
        matrix.setRegion(0, 0, 9, 9, true);
        matrix.setRegion(dimension - 8, 0, 8, 9, true);
        matrix.setRegion(0, dimension - 8, 9, 8, true);
        for (const x of version.alignmentPatternCenters) {
            for (const y of version.alignmentPatternCenters) {
                if (!(x === 6 && y === 6 || x === 6 && y === dimension - 7 || x === dimension - 7 && y === 6)) {
                    matrix.setRegion(x - 2, y - 2, 5, 5, true);
                }
            }
        }
        matrix.setRegion(6, 9, 1, dimension - 17, true);
        matrix.setRegion(9, 6, dimension - 17, 1, true);
        if (version.versionNumber > 6) {
            matrix.setRegion(dimension - 11, 0, 3, 6, true);
            matrix.setRegion(0, dimension - 11, 6, 3, true);
        }
        return matrix;
    }
    static readCodewords(matrix, version, formatInfo) {
        const dataMask = this.DATA_MASKS[formatInfo.dataMask];
        const dimension = matrix.height;
        const functionPatternMask = this.buildFunctionPatternMask(version);
        const codewords = [];
        let currentByte = 0;
        let bitsRead = 0;
        let readingUp = true;
        for (let columnIndex = dimension - 1; columnIndex > 0; columnIndex -= 2) {
            if (columnIndex === 6) {
                columnIndex--;
            }
            for (let i = 0; i < dimension; i++) {
                const y = readingUp ? dimension - 1 - i : i;
                for (let columnOffset = 0; columnOffset < 2; columnOffset++) {
                    const x = columnIndex - columnOffset;
                    if (!functionPatternMask.get(x, y)) {
                        bitsRead++;
                        let bit = matrix.get(x, y);
                        if (dataMask({ y, x })) {
                            bit = !bit;
                        }
                        currentByte = this.pushBit(bit, currentByte);
                        if (bitsRead === 8) {
                            codewords.push(currentByte);
                            bitsRead = 0;
                            currentByte = 0;
                        }
                    }
                }
            }
            readingUp = !readingUp;
        }
        return codewords;
    }
    static readVersion(matrix) {
        const dimension = matrix.height;
        const provisionalVersion = Math.floor((dimension - 17) / 4);
        if (provisionalVersion <= 6) {
            return Sw.VERSIONS[provisionalVersion - 1];
        }
        let topRightVersionBits = 0;
        for (let y = 5; y >= 0; y--) {
            for (let x = dimension - 9; x >= dimension - 11; x--) {
                topRightVersionBits = this.pushBit(matrix.get(x, y), topRightVersionBits);
            }
        }
        let bottomLeftVersionBits = 0;
        for (let x = 5; x >= 0; x--) {
            for (let y = dimension - 9; y >= dimension - 11; y--) {
                bottomLeftVersionBits = this.pushBit(matrix.get(x, y), bottomLeftVersionBits);
            }
        }
        let bestDifference = Infinity;
        let bestVersion = undefined;
        for (const version of Sw.VERSIONS) {
            if (version.infoBits === topRightVersionBits || version.infoBits === bottomLeftVersionBits) {
                return version;
            }
            let difference = this.numBitsDiffering(topRightVersionBits, version.infoBits ?? 0);
            if (difference < bestDifference) {
                bestVersion = version;
                bestDifference = difference;
            }
            difference = this.numBitsDiffering(bottomLeftVersionBits, version.infoBits ?? 0);
            if (difference < bestDifference) {
                bestVersion = version;
                bestDifference = difference;
            }
        }
        if (bestDifference <= 3) {
            return bestVersion;
        }
        return undefined;
    }
    static readFormatInformation(matrix) {
        let topLeftFormatInfoBits = 0;
        for (let x = 0; x <= 8; x++) {
            if (x !== 6) {
                topLeftFormatInfoBits = this.pushBit(matrix.get(x, 8), topLeftFormatInfoBits);
            }
        }
        for (let y = 7; y >= 0; y--) {
            if (y !== 6) {
                topLeftFormatInfoBits = this.pushBit(matrix.get(8, y), topLeftFormatInfoBits);
            }
        }
        const dimension = matrix.height;
        let topRightBottomRightFormatInfoBits = 0;
        for (let y = dimension - 1; y >= dimension - 7; y--) {
            topRightBottomRightFormatInfoBits = this.pushBit(matrix.get(8, y), topRightBottomRightFormatInfoBits);
        }
        for (let x = dimension - 8; x < dimension; x++) {
            topRightBottomRightFormatInfoBits = this.pushBit(matrix.get(x, 8), topRightBottomRightFormatInfoBits);
        }
        let bestDifference = Infinity;
        let bestFormatInfo = null;
        for (const { bits, formatInfo } of this.FORMAT_INFO_TABLE) {
            if (bits === topLeftFormatInfoBits || bits === topRightBottomRightFormatInfoBits) {
                return formatInfo;
            }
            let difference = this.numBitsDiffering(topLeftFormatInfoBits, bits);
            if (difference < bestDifference) {
                bestFormatInfo = formatInfo;
                bestDifference = difference;
            }
            if (topLeftFormatInfoBits !== topRightBottomRightFormatInfoBits) {
                difference = this.numBitsDiffering(topRightBottomRightFormatInfoBits, bits);
                if (difference < bestDifference) {
                    bestFormatInfo = formatInfo;
                    bestDifference = difference;
                }
            }
        }
        if (bestDifference <= 3) {
            return bestFormatInfo;
        }
        return null;
    }
    static getDataBlocks(codewords, version, ecLevel) {
        const ecInfo = version.errorCorrectionLevels[ecLevel];
        const dataBlocks = [];
        let totalCodewords = 0;
        ecInfo.ecBlocks.forEach(block => {
            for (let i = 0; i < block.numBlocks; i++) {
                dataBlocks.push({ numDataCodewords: block.dataCodewordsPerBlock, codewords: [] });
                totalCodewords += block.dataCodewordsPerBlock + ecInfo.ecCodewordsPerBlock;
            }
        });
        if (codewords.length < totalCodewords) {
            return null;
        }
        codewords = codewords.slice(0, totalCodewords);
        const shortBlockSize = ecInfo.ecBlocks[0].dataCodewordsPerBlock;
        for (let i = 0; i < shortBlockSize; i++) {
            for (const dataBlock of dataBlocks) {
                const shift = codewords.shift() ?? 0;
                dataBlock.codewords.push(shift);
            }
        }
        if (ecInfo.ecBlocks.length > 1) {
            const smallBlockCount = ecInfo.ecBlocks[0].numBlocks;
            const largeBlockCount = ecInfo.ecBlocks[1].numBlocks;
            for (let i = 0; i < largeBlockCount; i++) {
                const shift = codewords.shift() ?? 0;
                dataBlocks[smallBlockCount + i].codewords.push(shift);
            }
        }
        while (codewords.length > 0) {
            for (const dataBlock of dataBlocks) {
                const shift = codewords.shift() ?? 0;
                dataBlock.codewords.push(shift);
            }
        }
        return dataBlocks;
    }
    static decodeMatrix(matrix) {
        const version = this.readVersion(matrix);
        if (!version) {
            return null;
        }
        const formatInfo = this.readFormatInformation(matrix);
        if (!formatInfo) {
            return null;
        }
        const codewords = this.readCodewords(matrix, version, formatInfo);
        const dataBlocks = this.getDataBlocks(codewords, version, formatInfo.errorCorrectionLevel);
        if (!dataBlocks) {
            return null;
        }
        const totalBytes = dataBlocks.reduce((a, b) => a + b.numDataCodewords, 0);
        const resultBytes = new Uint8ClampedArray(totalBytes);
        let resultIndex = 0;
        for (const dataBlock of dataBlocks) {
            const correctedBytes = Sw.Reedsolomon.decode(dataBlock.codewords, dataBlock.codewords.length - dataBlock.numDataCodewords);
            if (!correctedBytes) {
                return null;
            }
            for (let i = 0; i < dataBlock.numDataCodewords; i++) {
                resultBytes[resultIndex++] = correctedBytes[i];
            }
        }
        try {
            return Sw.DecodeData.decode(resultBytes, version.versionNumber);
        }
        catch {
            return null;
        }
    }
    static decode(matrix) {
        if (matrix == null) {
            return null;
        }
        const result = this.decodeMatrix(matrix);
        if (result) {
            return result;
        }
        for (let x = 0; x < matrix.width; x++) {
            for (let y = x + 1; y < matrix.height; y++) {
                if (matrix.get(x, y) !== matrix.get(y, x)) {
                    matrix.set(x, y, !matrix.get(x, y));
                    matrix.set(y, x, !matrix.get(y, x));
                }
            }
        }
        return this.decodeMatrix(matrix);
    }
}
Sw.Decoder.Namespace=`QrCodeReader.Sw`;

_.Sw.Decoder=Sw.Decoder;
Sw.Binarizer=class Binarizer {
    static REGION_SIZE = 8;
    static MIN_DYNAMIC_RANGE = 24;
    static numBetween(value, min, max) {
        return value < min ? min : value > max ? max : value;
    }
    static binarize(data, width, height, returnInverted, greyscaleWeights, canOverwriteImage) {
        const pixelCount = width * height;
        if (data.length !== pixelCount * 4) {
            throw new Error("Malformed data passed to binarizer.");
        }
        let bufferOffset = 0;
        let greyscaleBuffer = undefined;
        if (canOverwriteImage) {
            greyscaleBuffer = new Uint8ClampedArray(data.buffer, bufferOffset, pixelCount);
            bufferOffset += pixelCount;
        }
        const greyscalePixels = new Sw.Matrix(width, height, greyscaleBuffer);
        if (greyscaleWeights.useIntegerApproximation) {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const pixelPosition = (y * width + x) * 4;
                    const r = data[pixelPosition];
                    const g = data[pixelPosition + 1];
                    const b = data[pixelPosition + 2];
                    greyscalePixels.set(x, y, (greyscaleWeights.red * r + greyscaleWeights.green * g + greyscaleWeights.blue * b + 128) >> 8);
                }
            }
        }
        else {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const pixelPosition = (y * width + x) * 4;
                    const r = data[pixelPosition];
                    const g = data[pixelPosition + 1];
                    const b = data[pixelPosition + 2];
                    greyscalePixels.set(x, y, greyscaleWeights.red * r + greyscaleWeights.green * g + greyscaleWeights.blue * b);
                }
            }
        }
        const horizontalRegionCount = Math.ceil(width / this.REGION_SIZE);
        const verticalRegionCount = Math.ceil(height / this.REGION_SIZE);
        const blackPointsCount = horizontalRegionCount * verticalRegionCount;
        let blackPointsBuffer = undefined;
        if (canOverwriteImage) {
            blackPointsBuffer = new Uint8ClampedArray(data.buffer, bufferOffset, blackPointsCount);
            bufferOffset += blackPointsCount;
        }
        const blackPoints = new Sw.Matrix(horizontalRegionCount, verticalRegionCount, blackPointsBuffer);
        for (let verticalRegion = 0; verticalRegion < verticalRegionCount; verticalRegion++) {
            for (let hortizontalRegion = 0; hortizontalRegion < horizontalRegionCount; hortizontalRegion++) {
                let min = Infinity;
                let max = 0;
                for (let y = 0; y < this.REGION_SIZE; y++) {
                    for (let x = 0; x < this.REGION_SIZE; x++) {
                        const pixelLumosity = greyscalePixels.get(hortizontalRegion * this.REGION_SIZE + x, verticalRegion * this.REGION_SIZE + y);
                        min = Math.min(min, pixelLumosity);
                        max = Math.max(max, pixelLumosity);
                    }
                }
                // of bright and dark pixels and essentially not much in between, by (min + max)/2 we make the cut really between
                let average = (min + max) / 2;
                const blackBias = 1.11;
                average = Math.min(255, average * blackBias);
                if (max - min <= this.MIN_DYNAMIC_RANGE) {
                    average = min / 2;
                    if (verticalRegion > 0 && hortizontalRegion > 0) {
                        // The (min < bp) is arbitrary but works better than other heuristics that were tried.
                        const averageNeighborBlackPoint = (blackPoints.get(hortizontalRegion, verticalRegion - 1) +
                            (2 * blackPoints.get(hortizontalRegion - 1, verticalRegion)) +
                            blackPoints.get(hortizontalRegion - 1, verticalRegion - 1)) / 4;
                        if (min < averageNeighborBlackPoint) {
                            average = averageNeighborBlackPoint;
                        }
                    }
                }
                blackPoints.set(hortizontalRegion, verticalRegion, average);
            }
        }
        let binarized;
        if (canOverwriteImage) {
            const binarizedBuffer = new Uint8ClampedArray(data.buffer, bufferOffset, pixelCount);
            bufferOffset += pixelCount;
            binarized = new Sw.BitMatrix(binarizedBuffer, width);
        }
        else {
            binarized = Sw.BitMatrix.createEmpty(width, height);
        }
        let inverted = null;
        if (returnInverted) {
            if (canOverwriteImage) {
                const invertedBuffer = new Uint8ClampedArray(data.buffer, bufferOffset, pixelCount);
                inverted = new Sw.BitMatrix(invertedBuffer, width);
            }
            else {
                inverted = Sw.BitMatrix.createEmpty(width, height);
            }
        }
        for (let verticalRegion = 0; verticalRegion < verticalRegionCount; verticalRegion++) {
            for (let hortizontalRegion = 0; hortizontalRegion < horizontalRegionCount; hortizontalRegion++) {
                const left = this.numBetween(hortizontalRegion, 2, horizontalRegionCount - 3);
                const top = this.numBetween(verticalRegion, 2, verticalRegionCount - 3);
                let sum = 0;
                for (let xRegion = -2; xRegion <= 2; xRegion++) {
                    for (let yRegion = -2; yRegion <= 2; yRegion++) {
                        sum += blackPoints.get(left + xRegion, top + yRegion);
                    }
                }
                const threshold = sum / 25;
                for (let xRegion = 0; xRegion < this.REGION_SIZE; xRegion++) {
                    for (let yRegion = 0; yRegion < this.REGION_SIZE; yRegion++) {
                        const x = hortizontalRegion * this.REGION_SIZE + xRegion;
                        const y = verticalRegion * this.REGION_SIZE + yRegion;
                        const lum = greyscalePixels.get(x, y);
                        binarized.set(x, y, lum <= threshold);
                        if (returnInverted && inverted) {
                            inverted.set(x, y, !(lum <= threshold));
                        }
                    }
                }
            }
        }
        if (returnInverted) {
            return { binarized, inverted };
        }
        return { binarized };
    }
}
Sw.Binarizer.Namespace=`QrCodeReader.Sw`;

_.Sw.Binarizer=Sw.Binarizer;
Sw.QrCode=class QrCode {
    static defaultOptions = {
        inversionAttempts: "attemptBoth",
        greyScaleWeights: {
            red: 0.2126,
            green: 0.7152,
            blue: 0.0722,
            useIntegerApproximation: false,
        },
        canOverwriteImage: true,
    };
    static scan(matrix) {
        if (!matrix)
            return null;
        const locations = Sw.Locator.locate(matrix);
        if (!locations) {
            return null;
        }
        for (const location of locations) {
            const extracted = Sw.Exctractor.extract(matrix, location);
            const decoded = Sw.Decoder.decode(extracted.matrix);
            if (decoded) {
                return {
                    binaryData: decoded.bytes,
                    data: decoded.text,
                    chunks: decoded.chunks,
                    version: decoded.version,
                    location: {
                        topRightCorner: extracted.mappingFunction(location.dimension, 0),
                        topLeftCorner: extracted.mappingFunction(0, 0),
                        bottomRightCorner: extracted.mappingFunction(location.dimension, location.dimension),
                        bottomLeftCorner: extracted.mappingFunction(0, location.dimension),
                        topRightFinderPattern: location.topRight,
                        topLeftFinderPattern: location.topLeft,
                        bottomLeftFinderPattern: location.bottomLeft,
                        bottomRightAlignmentPattern: location.alignmentPattern,
                    },
                    matrix: extracted.matrix,
                };
            }
        }
        return null;
    }
    static mergeObject(target, src) {
        Object.keys(src).forEach(opt => {
            target[opt] = src[opt];
        });
    }
    static jsQR(data, width, height, providedOptions = {}) {
        const options = Object.create(null);
        this.mergeObject(options, this.defaultOptions);
        this.mergeObject(options, providedOptions);
        const tryInvertedFirst = options.inversionAttempts === "onlyInvert" || options.inversionAttempts === "invertFirst";
        const shouldInvert = options.inversionAttempts === "attemptBoth" || tryInvertedFirst;
        const { binarized, inverted } = Sw.Binarizer.binarize(data, width, height, shouldInvert, options.greyScaleWeights, options.canOverwriteImage);
        let result = this.scan(tryInvertedFirst ? inverted : binarized);
        if (!result && (options.inversionAttempts === "attemptBoth" || options.inversionAttempts === "invertFirst")) {
            result = this.scan(tryInvertedFirst ? binarized : inverted);
        }
        return result;
    }
}
Sw.QrCode.Namespace=`QrCodeReader.Sw`;

_.Sw.QrCode=Sw.QrCode;
Sw.WorkerDispatch=class WorkerDispatch {
    static inversionAttempts = 'dontInvert';
    static grayscaleWeights = {
        // weights for quick luma integer approximation (https://en.wikipedia.org/wiki/YUV#Full_swing_for_BT.601)
        red: 77,
        green: 150,
        blue: 29,
        useIntegerApproximation: true,
    };
    static decode(data, requestId) {
        const rgbaData = data['data'];
        const width = data['width'];
        const height = data['height'];
        const result = Sw.QrCode.jsQR(rgbaData, width, height, {
            inversionAttempts: this.inversionAttempts,
            greyScaleWeights: this.grayscaleWeights,
        });
        if (!result) {
            self.postMessage({
                id: requestId,
                type: 'qrResult',
                data: null,
            });
            return;
        }
        self.postMessage({
            id: requestId,
            type: 'qrResult',
            data: result.data,
            cornerPoints: [
                result.location.topLeftCorner,
                result.location.topRightCorner,
                result.location.bottomRightCorner,
                result.location.bottomLeftCorner,
            ],
        });
    }
    static setGrayscaleWeights(data) {
        this.grayscaleWeights.red = data['red'];
        this.grayscaleWeights.green = data['green'];
        this.grayscaleWeights.blue = data['blue'];
        this.grayscaleWeights.useIntegerApproximation = data['useIntegerApproximation'];
    }
    static setInversionMode(inversionMode) {
        switch (inversionMode) {
            case 'original':
                this.inversionAttempts = 'dontInvert';
                break;
            case 'invert':
                this.inversionAttempts = 'onlyInvert';
                break;
            case 'both':
                this.inversionAttempts = 'attemptBoth';
                break;
            default:
                throw new Error('Invalid inversion mode');
        }
    }
}
Sw.WorkerDispatch.Namespace=`QrCodeReader.Sw`;

_.Sw.WorkerDispatch=Sw.WorkerDispatch;
const createWorker=function createWorker() {
    const sw = window['QrCodeReader'].Sw;
    const decode = Sw.WorkerDispatch.decode;
    let txt = `(() => {
        var QrCodeReader;
        (QrCodeReader||(QrCodeReader = {}));
        (function (QrCodeReader) {
            const Sw = {};
            $injected$
            QrCodeReader.Sw = Sw;
        })(QrCodeReader);


        self.onmessage = event => {
            const id = event['data']['id'];
            const type = event['data']['type'];
            const data = event['data']['data'];

            switch (type) {
                case 'decode':
                    QrCodeReader.Sw.WorkerDispatch.decode(data, id);
                    break;
                case 'grayscaleWeights':
                    QrCodeReader.Sw.WorkerDispatch.setGrayscaleWeights(data);
                    break;
                case 'inversionMode':
                    QrCodeReader.Sw.WorkerDispatch.setInversionMode(data);
                    break;
                case 'close':
                    
                    self.close();
                    break;
            }
        };
    })()`;
    const injections = [];
    for (let key in sw) {
        let obj = sw[key];
        if (Aventus.isClass(obj)) {
            injections.push(`Sw.${key} = ${obj.toString()}`);
        }
        else if (typeof obj == 'function') {
            injections.push(`Sw.${key} = ${obj.toString()}`);
        }
        else if (typeof obj == 'object') {
            injections.push(`Sw.${key} = ${JSON.stringify(obj)}`);
        }
    }
    txt = txt.replace("$injected$", injections.join("\n"));
    return new Worker(URL.createObjectURL(new Blob([txt])));
}

const QrScanner=class QrScanner {
    static DEFAULT_CANVAS_SIZE = 400;
    static NO_QR_CODE_FOUND = 'No QR code found';
    static _disableBarcodeDetector = false;
    static _workerMessageId = 0;
    static async hasCamera() {
        try {
            return !!(await this.listCameras(false)).length;
        }
        catch (e) {
            return false;
        }
    }
    static async listCameras(requestLabels = false) {
        if (!navigator.mediaDevices)
            return [];
        const enumerateCameras = async () => (await navigator.mediaDevices.enumerateDevices()).filter((device) => device.kind === 'videoinput');
        let openedStream;
        try {
            if (requestLabels && (await enumerateCameras()).every((camera) => !camera.label)) {
                openedStream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
            }
        }
        catch (e) {
        }
        try {
            return (await enumerateCameras()).map((camera, i) => ({
                id: camera.deviceId,
                label: camera.label || (i === 0 ? 'Default Camera' : `Camera ${i + 1}`),
            }));
        }
        finally {
            if (openedStream) {
                console.warn('Call listCameras after successfully starting a QR scanner to avoid creating '
                    + 'a temporary video stream');
                this._stopVideoStream(openedStream);
            }
        }
    }
    $video;
    $canvas;
    $overlay;
    $codeOutlineHighlight;
    _onDecode;
    _legacyCanvasSize = QrScanner.DEFAULT_CANVAS_SIZE;
    _preferredCamera = 'environment';
    _maxScansPerSecond = 25;
    _lastScanTimestamp = -1;
    _scanRegion;
    _codeOutlineHighlightRemovalTimeout;
    _qrEnginePromise;
    _active = false;
    _paused = false;
    _flashOn = false;
    _destroyed = false;
    constructor(video, onDecode, canvasSizeOrOnDecodeErrorOrOptions) {
        this.$video = video;
        this.$canvas = document.createElement('canvas');
        this._onDecode = onDecode;
        const options = canvasSizeOrOnDecodeErrorOrOptions;
        this._onDecodeError = options.onDecodeError || this._onDecodeError;
        this._preferredCamera = options.preferredCamera || this._preferredCamera;
        this._maxScansPerSecond = options.maxScansPerSecond || this._maxScansPerSecond;
        this._onPlay = this._onPlay.bind(this);
        this._onLoadedMetaData = this._onLoadedMetaData.bind(this);
        this._onVisibilityChange = this._onVisibilityChange.bind(this);
        this._updateOverlay = this._updateOverlay.bind(this);
        video.disablePictureInPicture = true;
        video.playsInline = true;
        // Allow play() on iPhone without requiring a user gesture. Should not really be needed as camera stream
        video.muted = true;
        let shouldHideVideo = false;
        if (video.hidden) {
            video.hidden = false;
            shouldHideVideo = true;
        }
        if (!video.parentNode) {
            document.body.appendChild(video);
            shouldHideVideo = true;
        }
        const videoContainer = video.parentNode;
        if (options.highlightScanRegion || options.highlightCodeOutline) {
            const gotExternalOverlay = !!options.overlay;
            this.$overlay = options.overlay || document.createElement('div');
            const overlayStyle = this.$overlay.style;
            overlayStyle.position = 'absolute';
            overlayStyle.display = 'none';
            overlayStyle.pointerEvents = 'none';
            this.$overlay.classList.add('scan-region-highlight');
            if (!gotExternalOverlay && options.highlightScanRegion) {
                this.$overlay.innerHTML = '<svg class="scan-region-highlight-svg" viewBox="0 0 238 238" '
                    + 'preserveAspectRatio="none" style="position:absolute;width:100%;height:100%;left:0;top:0;'
                    + 'fill:none;stroke:#e9b213;stroke-width:4;stroke-linecap:round;stroke-linejoin:round">'
                    + '<path d="M31 2H10a8 8 0 0 0-8 8v21M207 2h21a8 8 0 0 1 8 8v21m0 176v21a8 8 0 0 1-8 8h-21m-176 '
                    + '0H10a8 8 0 0 1-8-8v-21"/></svg>';
                try {
                    if (options.animateScanRegion) {
                        this.$overlay.firstElementChild.animate({ transform: ['scale(.98)', 'scale(1.01)'] }, {
                            duration: 400,
                            iterations: Infinity,
                            direction: 'alternate',
                            easing: 'ease-in-out',
                        });
                    }
                }
                catch (e) { }
                videoContainer.insertBefore(this.$overlay, this.$video.nextSibling);
            }
            if (options.highlightCodeOutline) {
                this.$overlay.insertAdjacentHTML('beforeend', '<svg class="code-outline-highlight" preserveAspectRatio="none" style="display:none;width:100%;'
                    + 'height:100%;fill:none;stroke:#e9b213;stroke-width:5;stroke-dasharray:25;'
                    + 'stroke-linecap:round;stroke-linejoin:round"><polygon/></svg>');
                this.$codeOutlineHighlight = this.$overlay.lastElementChild;
            }
        }
        this._scanRegion = this._calculateScanRegion(video);
        requestAnimationFrame(() => {
            const videoStyle = window.getComputedStyle(video);
            if (videoStyle.display === 'none') {
                video.style.setProperty('display', 'block', 'important');
                shouldHideVideo = true;
            }
            if (videoStyle.visibility !== 'visible') {
                video.style.setProperty('visibility', 'visible', 'important');
                shouldHideVideo = true;
            }
            if (shouldHideVideo) {
                console.warn('QrScanner has overwritten the video hiding style to avoid Safari stopping the playback.');
                video.style.opacity = '0';
                video.style.width = '0';
                video.style.height = '0';
                if (this.$overlay && this.$overlay.parentElement) {
                    this.$overlay.parentElement.removeChild(this.$overlay);
                }
                delete this.$overlay;
                delete this.$codeOutlineHighlight;
            }
            if (this.$overlay) {
                this._updateOverlay();
            }
        });
        video.addEventListener('play', this._onPlay);
        video.addEventListener('loadedmetadata', this._onLoadedMetaData);
        document.addEventListener('visibilitychange', this._onVisibilityChange);
        window.addEventListener('resize', this._updateOverlay);
        this._qrEnginePromise = QrScanner.createQrEngine();
    }
    async hasFlash() {
        let stream;
        try {
            if (this.$video.srcObject) {
                if (!(this.$video.srcObject instanceof MediaStream))
                    return false;
                stream = this.$video.srcObject;
            }
            else {
                stream = (await this._getCameraStream()).stream;
            }
            return 'torch' in stream.getVideoTracks()[0].getSettings();
        }
        catch (e) {
            return false;
        }
        finally {
            if (stream && stream !== this.$video.srcObject) {
                console.warn('Call hasFlash after successfully starting the scanner to avoid creating '
                    + 'a temporary video stream');
                QrScanner._stopVideoStream(stream);
            }
        }
    }
    isFlashOn() {
        return this._flashOn;
    }
    async toggleFlash() {
        if (this._flashOn) {
            await this.turnFlashOff();
        }
        else {
            await this.turnFlashOn();
        }
    }
    async turnFlashOn() {
        if (this._flashOn || this._destroyed)
            return;
        this._flashOn = true;
        if (!this._active || this._paused)
            return; // flash will be turned on later on .start()
        try {
            if (!await this.hasFlash())
                throw 'No flash available';
            await this.$video.srcObject.getVideoTracks()[0].applyConstraints({
                advanced: [{ torch: true }],
            });
        }
        catch (e) {
            this._flashOn = false;
            throw e;
        }
    }
    async turnFlashOff() {
        if (!this._flashOn)
            return;
        this._flashOn = false;
        await this._restartVideoStream();
    }
    destroy() {
        this.$video.removeEventListener('loadedmetadata', this._onLoadedMetaData);
        this.$video.removeEventListener('play', this._onPlay);
        document.removeEventListener('visibilitychange', this._onVisibilityChange);
        window.removeEventListener('resize', this._updateOverlay);
        this._destroyed = true;
        this._flashOn = false;
        this.stop();
        QrScanner._postWorkerMessage(this._qrEnginePromise, 'close');
    }
    async start() {
        if (this._destroyed)
            throw new Error('The QR scanner can not be started as it had been destroyed.');
        if (this._active && !this._paused)
            return;
        if (window.location.protocol !== 'https:') {
            console.warn('The camera stream is only accessible if the page is transferred via https.');
        }
        this._active = true;
        if (document.hidden)
            return;
        this._paused = false;
        if (this.$video.srcObject) {
            await this.$video.play();
            return;
        }
        try {
            const { stream, facingMode } = await this._getCameraStream();
            if (!this._active || this._paused) {
                QrScanner._stopVideoStream(stream);
                return;
            }
            this._setVideoMirror(facingMode);
            this.$video.srcObject = stream;
            await this.$video.play();
            if (this._flashOn) {
                this._flashOn = false;
                this.turnFlashOn().catch(() => { });
            }
        }
        catch (e) {
            if (this._paused)
                return;
            this._active = false;
            throw e;
        }
    }
    stop() {
        this.pause();
        this._active = false;
    }
    async pause(stopStreamImmediately = false) {
        this._paused = true;
        if (!this._active)
            return true;
        this.$video.pause();
        if (this.$overlay) {
            this.$overlay.style.display = 'none';
        }
        const stopStream = () => {
            if (this.$video.srcObject instanceof MediaStream) {
                QrScanner._stopVideoStream(this.$video.srcObject);
                this.$video.srcObject = null;
            }
        };
        if (stopStreamImmediately) {
            stopStream();
            return true;
        }
        await new Promise((resolve) => setTimeout(resolve, 300));
        if (!this._paused)
            return false;
        stopStream();
        return true;
    }
    async setCamera(facingModeOrDeviceId) {
        if (facingModeOrDeviceId === this._preferredCamera)
            return;
        this._preferredCamera = facingModeOrDeviceId;
        await this._restartVideoStream();
    }
    static async scanImage(imageOrFileOrBlobOrUrl, scanRegionOrOptions) {
        let scanRegion = scanRegionOrOptions.scanRegion;
        let qrEngine = scanRegionOrOptions.qrEngine;
        let canvas = scanRegionOrOptions.canvas;
        let disallowCanvasResizing = scanRegionOrOptions.disallowCanvasResizing || false;
        let alsoTryWithoutScanRegion = scanRegionOrOptions.alsoTryWithoutScanRegion || false;
        const gotExternalEngine = !!qrEngine;
        try {
            let image;
            let canvasContext;
            [qrEngine, image] = await Promise.all([
                qrEngine || QrScanner.createQrEngine(),
                QrScanner._loadImage(imageOrFileOrBlobOrUrl),
            ]);
            [canvas, canvasContext] = QrScanner._drawToCanvas(image, scanRegion, canvas, disallowCanvasResizing);
            let detailedScanResult;
            if (qrEngine instanceof Worker) {
                const qrEngineWorker = qrEngine;
                if (!gotExternalEngine) {
                    QrScanner._postWorkerMessageSync(qrEngineWorker, 'inversionMode', 'both');
                }
                detailedScanResult = await new Promise((resolve, reject) => {
                    let timeout;
                    let onMessage;
                    let onError;
                    let expectedResponseId = -1;
                    onMessage = (event) => {
                        if (event.data.id !== expectedResponseId) {
                            return;
                        }
                        qrEngineWorker.removeEventListener('message', onMessage);
                        qrEngineWorker.removeEventListener('error', onError);
                        clearTimeout(timeout);
                        if (event.data.data !== null) {
                            resolve({
                                data: event.data.data,
                                cornerPoints: QrScanner._convertPoints(event.data.cornerPoints, scanRegion),
                            });
                        }
                        else {
                            reject(QrScanner.NO_QR_CODE_FOUND);
                        }
                    };
                    onError = (error) => {
                        qrEngineWorker.removeEventListener('message', onMessage);
                        qrEngineWorker.removeEventListener('error', onError);
                        clearTimeout(timeout);
                        const errorMessage = !error ? 'Unknown Error' : (error.message || error);
                        reject('Scanner error: ' + errorMessage);
                    };
                    qrEngineWorker.addEventListener('message', onMessage);
                    qrEngineWorker.addEventListener('error', onError);
                    timeout = setTimeout(() => onError('timeout'), 10000);
                    const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
                    expectedResponseId = QrScanner._postWorkerMessageSync(qrEngineWorker, 'decode', imageData, [imageData.data.buffer]);
                });
            }
            else {
                detailedScanResult = await Promise.race([
                    new Promise((resolve, reject) => window.setTimeout(() => reject('Scanner error: timeout'), 10000)),
                    (async () => {
                        try {
                            const [scanResult] = await qrEngine.detect(canvas);
                            if (!scanResult)
                                throw QrScanner.NO_QR_CODE_FOUND;
                            return {
                                data: scanResult.rawValue,
                                cornerPoints: QrScanner._convertPoints(scanResult.cornerPoints, scanRegion),
                            };
                        }
                        catch (e) {
                            const errorMessage = e.message || e;
                            if (/not implemented|service unavailable/.test(errorMessage)) {
                                QrScanner._disableBarcodeDetector = true;
                                return this.scanImage(imageOrFileOrBlobOrUrl, {
                                    qrEngine: null,
                                    scanRegion,
                                    canvas,
                                    disallowCanvasResizing,
                                    alsoTryWithoutScanRegion,
                                });
                            }
                            throw `Scanner error: ${errorMessage}`;
                        }
                    })(),
                ]);
            }
            return detailedScanResult;
        }
        catch (e) {
            if (!scanRegion || !alsoTryWithoutScanRegion)
                throw e;
            const detailedScanResult = await this.scanImage(imageOrFileOrBlobOrUrl, {
                scanRegion: null,
                qrEngine,
                canvas,
                disallowCanvasResizing,
                alsoTryWithoutScanRegion: false
            });
            return detailedScanResult;
        }
        finally {
            if (!gotExternalEngine) {
                this._postWorkerMessage(qrEngine, 'close');
            }
        }
    }
    setGrayscaleWeights(red, green, blue, useIntegerApproximation = true) {
        QrScanner._postWorkerMessage(this._qrEnginePromise, 'grayscaleWeights', { red, green, blue, useIntegerApproximation });
    }
    setInversionMode(inversionMode) {
        QrScanner._postWorkerMessage(this._qrEnginePromise, 'inversionMode', inversionMode);
    }
    static async createQrEngine() {
        const useBarcodeDetector = !this._disableBarcodeDetector
            && 'BarcodeDetector' in window
            && BarcodeDetector.getSupportedFormats
            && (await BarcodeDetector.getSupportedFormats()).includes('qr_code');
        console.log("Create Engine");
        console.log(useBarcodeDetector);
        if (!useBarcodeDetector)
            return createWorker();
        // On Macs with an M1/M2 processor and macOS Ventura (macOS version 13), the BarcodeDetector is broken in
        const userAgentData = navigator.userAgentData;
        const isChromiumOnMacWithArmVentura = userAgentData
            && userAgentData.brands.some(({ brand }) => /Chromium/i.test(brand))
            && /mac ?OS/i.test(userAgentData.platform)
            // Does it have an ARM chip (e.g. M1/M2) and Ventura? Check this last as getHighEntropyValues can
            && await userAgentData.getHighEntropyValues(['architecture', 'platformVersion'])
                .then(({ architecture, platformVersion }) => /arm/i.test(architecture || 'arm') && parseInt(platformVersion || '13') >= 13)
                .catch(() => true);
        if (isChromiumOnMacWithArmVentura)
            return createWorker();
        return new BarcodeDetector({ formats: ['qr_code'] });
    }
    _onPlay() {
        this._scanRegion = this._calculateScanRegion(this.$video);
        this._updateOverlay();
        if (this.$overlay) {
            this.$overlay.style.display = '';
        }
        this._scanFrame();
    }
    _onLoadedMetaData() {
        this._scanRegion = this._calculateScanRegion(this.$video);
        this._updateOverlay();
    }
    _onVisibilityChange() {
        if (document.hidden) {
            this.pause();
        }
        else if (this._active) {
            this.start();
        }
    }
    _calculateScanRegion(video) {
        const smallestDimension = Math.min(video.videoWidth, video.videoHeight);
        const scanRegionSize = Math.round(2 / 3 * smallestDimension);
        return {
            x: Math.round((video.videoWidth - scanRegionSize) / 2),
            y: Math.round((video.videoHeight - scanRegionSize) / 2),
            width: scanRegionSize,
            height: scanRegionSize,
            downScaledWidth: this._legacyCanvasSize,
            downScaledHeight: this._legacyCanvasSize,
        };
    }
    _updateOverlay() {
        requestAnimationFrame(() => {
            if (!this.$overlay)
                return;
            const video = this.$video;
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;
            const elementWidth = video.offsetWidth;
            const elementHeight = video.offsetHeight;
            const elementX = video.offsetLeft;
            const elementY = video.offsetTop;
            const videoStyle = window.getComputedStyle(video);
            const videoObjectFit = videoStyle.objectFit;
            const videoAspectRatio = videoWidth / videoHeight;
            const elementAspectRatio = elementWidth / elementHeight;
            let videoScaledWidth;
            let videoScaledHeight;
            switch (videoObjectFit) {
                case 'none':
                    videoScaledWidth = videoWidth;
                    videoScaledHeight = videoHeight;
                    break;
                case 'fill':
                    videoScaledWidth = elementWidth;
                    videoScaledHeight = elementHeight;
                    break;
                default:
                    if (videoObjectFit === 'cover'
                        ? videoAspectRatio > elementAspectRatio
                        : videoAspectRatio < elementAspectRatio) {
                        //   (scaled height matches element height and scaled width overflows element width)
                        //   (scaled height matched element height and element width overflows scaled width)
                        videoScaledHeight = elementHeight;
                        videoScaledWidth = videoScaledHeight * videoAspectRatio;
                    }
                    else {
                        videoScaledWidth = elementWidth;
                        videoScaledHeight = videoScaledWidth / videoAspectRatio;
                    }
                    if (videoObjectFit === 'scale-down') {
                        videoScaledWidth = Math.min(videoScaledWidth, videoWidth);
                        videoScaledHeight = Math.min(videoScaledHeight, videoHeight);
                    }
            }
            // getComputedStyle is so nice to convert keywords (left, center, right, top, bottom) to percent and makes
            // both components are set. Additionally, it converts units other than px (e.g. rem) to px.
            const [videoX, videoY] = videoStyle.objectPosition.split(' ').map((length, i) => {
                const lengthValue = parseFloat(length);
                return length.endsWith('%')
                    ? (!i ? elementWidth - videoScaledWidth : elementHeight - videoScaledHeight) * lengthValue / 100
                    : lengthValue;
            });
            const regionWidth = this._scanRegion.width || videoWidth;
            const regionHeight = this._scanRegion.height || videoHeight;
            const regionX = this._scanRegion.x || 0;
            const regionY = this._scanRegion.y || 0;
            const overlayStyle = this.$overlay.style;
            overlayStyle.width = `${regionWidth / videoWidth * videoScaledWidth}px`;
            overlayStyle.height = `${regionHeight / videoHeight * videoScaledHeight}px`;
            overlayStyle.top = `${elementY + videoY + regionY / videoHeight * videoScaledHeight}px`;
            const isVideoMirrored = /scaleX\(-1\)/.test(video.style.transform);
            overlayStyle.left = `${elementX
                + (isVideoMirrored ? elementWidth - videoX - videoScaledWidth : videoX)
                + (isVideoMirrored ? videoWidth - regionX - regionWidth : regionX) / videoWidth * videoScaledWidth}px`;
            overlayStyle.transform = video.style.transform;
        });
    }
    static _convertPoints(points, scanRegion) {
        if (!scanRegion)
            return points;
        const offsetX = scanRegion.x || 0;
        const offsetY = scanRegion.y || 0;
        const scaleFactorX = scanRegion.width && scanRegion.downScaledWidth
            ? scanRegion.width / scanRegion.downScaledWidth
            : 1;
        const scaleFactorY = scanRegion.height && scanRegion.downScaledHeight
            ? scanRegion.height / scanRegion.downScaledHeight
            : 1;
        for (const point of points) {
            point.x = point.x * scaleFactorX + offsetX;
            point.y = point.y * scaleFactorY + offsetY;
        }
        return points;
    }
    _scanFrame() {
        if (!this._active || this.$video.paused || this.$video.ended)
            return;
        const requestFrame = 'requestVideoFrameCallback' in this.$video
            ? this.$video.requestVideoFrameCallback.bind(this.$video)
            : requestAnimationFrame;
        requestFrame(async () => {
            if (this.$video.readyState <= 1) {
                // Skip scans until the video is ready as drawImage() only works correctly on a video with readyState
                this._scanFrame();
                return;
            }
            const timeSinceLastScan = Date.now() - this._lastScanTimestamp;
            const minimumTimeBetweenScans = 1000 / this._maxScansPerSecond;
            if (timeSinceLastScan < minimumTimeBetweenScans) {
                await new Promise((resolve) => setTimeout(resolve, minimumTimeBetweenScans - timeSinceLastScan));
            }
            // console.log('Scan rate:', Math.round(1000 / (Date.now() - this._lastScanTimestamp)));
            this._lastScanTimestamp = Date.now();
            let result;
            try {
                result = await QrScanner.scanImage(this.$video, {
                    scanRegion: this._scanRegion,
                    qrEngine: this._qrEnginePromise,
                    canvas: this.$canvas,
                    disallowCanvasResizing: false,
                    alsoTryWithoutScanRegion: false,
                });
            }
            catch (error) {
                if (!this._active)
                    return;
                this._onDecodeError(error);
            }
            if (QrScanner._disableBarcodeDetector && !(await this._qrEnginePromise instanceof Worker)) {
                this._qrEnginePromise = QrScanner.createQrEngine();
            }
            if (result) {
                if (this._onDecode) {
                    this._onDecode(result);
                }
                if (this.$codeOutlineHighlight) {
                    clearTimeout(this._codeOutlineHighlightRemovalTimeout);
                    this._codeOutlineHighlightRemovalTimeout = undefined;
                    this.$codeOutlineHighlight.setAttribute('viewBox', `${this._scanRegion.x || 0} `
                        + `${this._scanRegion.y || 0} `
                        + `${this._scanRegion.width || this.$video.videoWidth} `
                        + `${this._scanRegion.height || this.$video.videoHeight}`);
                    const polygon = this.$codeOutlineHighlight.firstElementChild;
                    polygon.setAttribute('points', result.cornerPoints.map(({ x, y }) => `${x},${y}`).join(' '));
                    this.$codeOutlineHighlight.style.display = '';
                }
            }
            else if (this.$codeOutlineHighlight && !this._codeOutlineHighlightRemovalTimeout) {
                this._codeOutlineHighlightRemovalTimeout = setTimeout(() => this.$codeOutlineHighlight.style.display = 'none', 100);
            }
            this._scanFrame();
        });
    }
    _onDecodeError(error) {
        if (error === QrScanner.NO_QR_CODE_FOUND)
            return;
        console.log(error);
    }
    async _getCameraStream() {
        if (!navigator.mediaDevices)
            throw 'Camera not found.';
        const preferenceType = /^(environment|user)$/.test(this._preferredCamera)
            ? 'facingMode'
            : 'deviceId';
        const constraintsWithoutCamera = [{
                width: { min: 1024 }
            }, {
                width: { min: 768 }
            }, {}];
        const constraintsWithCamera = constraintsWithoutCamera.map((constraint) => Object.assign({}, constraint, {
            [preferenceType]: { exact: this._preferredCamera },
        }));
        for (const constraints of [...constraintsWithCamera, ...constraintsWithoutCamera]) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: constraints, audio: false });
                const facingMode = this._getFacingMode(stream)
                    || (constraints.facingMode
                        ? this._preferredCamera
                        : (this._preferredCamera === 'environment'
                            ? 'user'
                            : 'environment'));
                return { stream, facingMode };
            }
            catch (e) { }
        }
        throw 'Camera not found.';
    }
    async _restartVideoStream() {
        const wasPaused = this._paused;
        const paused = await this.pause(true);
        if (!paused || wasPaused || !this._active)
            return;
        await this.start();
    }
    static _stopVideoStream(stream) {
        for (const track of stream.getTracks()) {
            track.stop();
            stream.removeTrack(track);
        }
    }
    _setVideoMirror(facingMode) {
        const scaleFactor = facingMode === 'user' ? -1 : 1;
        this.$video.style.transform = 'scaleX(' + scaleFactor + ')';
    }
    _getFacingMode(videoStream) {
        const videoTrack = videoStream.getVideoTracks()[0];
        if (!videoTrack)
            return null;
        return /rear|back|environment/i.test(videoTrack.label)
            ? 'environment'
            : /front|user|face/i.test(videoTrack.label)
                ? 'user'
                : null;
    }
    static _drawToCanvas(image, scanRegion, canvas, disallowCanvasResizing = false) {
        canvas = canvas || document.createElement('canvas');
        const scanRegionX = scanRegion && scanRegion.x ? scanRegion.x : 0;
        const scanRegionY = scanRegion && scanRegion.y ? scanRegion.y : 0;
        const scanRegionWidth = scanRegion && scanRegion.width
            ? scanRegion.width
            : image.videoWidth || image.width;
        const scanRegionHeight = scanRegion && scanRegion.height
            ? scanRegion.height
            : image.videoHeight || image.height;
        if (!disallowCanvasResizing) {
            const canvasWidth = scanRegion && scanRegion.downScaledWidth
                ? scanRegion.downScaledWidth
                : scanRegionWidth;
            const canvasHeight = scanRegion && scanRegion.downScaledHeight
                ? scanRegion.downScaledHeight
                : scanRegionHeight;
            if (canvas.width !== canvasWidth) {
                canvas.width = canvasWidth;
            }
            if (canvas.height !== canvasHeight) {
                canvas.height = canvasHeight;
            }
        }
        const context = canvas.getContext('2d', { alpha: false });
        context.imageSmoothingEnabled = false;
        context.drawImage(image, scanRegionX, scanRegionY, scanRegionWidth, scanRegionHeight, 0, 0, canvas.width, canvas.height);
        return [canvas, context];
    }
    static async _loadImage(imageOrFileOrBlobOrUrl) {
        if (imageOrFileOrBlobOrUrl instanceof Image) {
            await this._awaitImageLoad(imageOrFileOrBlobOrUrl);
            return imageOrFileOrBlobOrUrl;
        }
        else if (imageOrFileOrBlobOrUrl instanceof HTMLVideoElement
            || imageOrFileOrBlobOrUrl instanceof HTMLCanvasElement
            || imageOrFileOrBlobOrUrl instanceof SVGImageElement
            || 'OffscreenCanvas' in window && imageOrFileOrBlobOrUrl instanceof OffscreenCanvas
            || 'ImageBitmap' in window && imageOrFileOrBlobOrUrl instanceof ImageBitmap) {
            return imageOrFileOrBlobOrUrl;
        }
        else if (imageOrFileOrBlobOrUrl instanceof File || imageOrFileOrBlobOrUrl instanceof Blob
            || imageOrFileOrBlobOrUrl instanceof URL || typeof imageOrFileOrBlobOrUrl === 'string') {
            const image = new Image();
            if (imageOrFileOrBlobOrUrl instanceof File || imageOrFileOrBlobOrUrl instanceof Blob) {
                image.src = URL.createObjectURL(imageOrFileOrBlobOrUrl);
            }
            else {
                image.src = imageOrFileOrBlobOrUrl.toString();
            }
            try {
                await this._awaitImageLoad(image);
                return image;
            }
            finally {
                if (imageOrFileOrBlobOrUrl instanceof File || imageOrFileOrBlobOrUrl instanceof Blob) {
                    URL.revokeObjectURL(image.src);
                }
            }
        }
        else {
            throw 'Unsupported image type.';
        }
    }
    static async _awaitImageLoad(image) {
        if (image.complete && image.naturalWidth !== 0)
            return;
        await new Promise((resolve, reject) => {
            const listener = (event) => {
                image.removeEventListener('load', listener);
                image.removeEventListener('error', listener);
                if (event instanceof ErrorEvent) {
                    reject('Image load error');
                }
                else {
                    resolve();
                }
            };
            image.addEventListener('load', listener);
            image.addEventListener('error', listener);
        });
    }
    static async _postWorkerMessage(qrEngineOrQrEnginePromise, type, data, transfer) {
        return this._postWorkerMessageSync(await qrEngineOrQrEnginePromise, type, data, transfer);
    }
    static _postWorkerMessageSync(qrEngine, type, data, transfer) {
        if (!(qrEngine instanceof Worker))
            return -1;
        const id = this._workerMessageId++;
        qrEngine.postMessage({
            id,
            type,
            data,
        }, transfer);
        return id;
    }
}
QrScanner.Namespace=`QrCodeReader`;

_.QrScanner=QrScanner;

for(let key in _) { QrCodeReader[key] = _[key] }
})(QrCodeReader);
