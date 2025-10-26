function birthGenerateHTML(params) {
    return `
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Birth Certificate</title>
            </head>
            <style>
                .field-label {
                    font-size: 10px;
                }

                .field-label-2 {
                    font-size: 10px;
                    color:green;
                }

                .field-label-small-text {
                    font-size: 8px;
                    color:green;
                }
                .field-label-small-text-2 {
                    font-size: 6px;
                    color:green;
                }


                body {
                font-family: Arial;
                margin: 0;
                padding: 0;
                background: #f0f0f0;
                }

                .page {
                width: 8.5in;
                height: 14in; 
                margin: 20px auto;
                background: white;
                box-sizing: border-box;
                page-break-after: always;
                position: relative;
                }

                /* Inner content box with 1in margin and green border */
                .content {
                position: absolute;
                top: 0.5in;
                left: 0.5in;
                right: 0.5in;
                bottom: 0.5in;
                border: 2px solid green;
                box-sizing: border-box;
                padding: 4px 0px 4px 0px;
                }

                .header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                }

                .header-left {
                text-align: left;
                font-size: 11px;
                }

                .header-center {
                text-align: center;
                margin-top: -12px;
                line-height: 0.8;
                }

                .header-right {
                text-align: right;
                font-size: 11px;
                white-space: nowrap;
                }

            </style>
            <body>
            <div id="certificate">
                <!-- First Page -->
                <div class="page">
                <div class="content">
                    <div class="header">
                        <div class="header-left ">
                            <span>&nbsp;Municipal Form No. 102 <br>
                            <span style="margin-top: 20px;">&nbsp;(Revised January 2007)</span>
                        </div>
                        <div class="header-right">
                            <span>(To be accomplished in quadruplicate using black ink) &nbsp;</span>
                        </div>
                    </div>
            
                    <div class="header-center">
                        <span style="font-size:12px;">
                            Republic of the Philippines<br>
                        </span>
                        <span style="font-size:12px;">
                            OFFICE OF THE CIVIL REGISTRAR GENERAL<br>
                        </span>
                        <span style="font-size:28px; font-weight:bold;">
                            CERTIFICATE OF LIVE BIRTH
                        </span>
                    </div>
                    <!-- Province -->
                    <div class="field-label" style="display: flex; height: 40px; border-bottom: 0.2px solid green; border-top: 0.2px solid green;  margin-top: 2px;">
                    <div style="padding-left: 4px; display: flex; justify-content:space-evenly;  flex-direction: column; width: 70%; border-right: 0.2px solid green;">
                        <div style="display: flex; padding-top: 4px;">
                            <span>Province:</span>
                            <span style="flex-grow: 1; display:inline-block; height: 1.2em; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center;">
                                ${params.province}
                            </span>
                        </div>
                        <div style="display: flex;">
                            <span>City/Municipality:</span>
                            <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center;">
                            Sogod
                        </span>
                        </div>
                    </div>
                    <div style="padding-left: 4px; width: 30%; border-left: 0.2px solid green;">
                        <span>
                            Registry No.
                        </span>
                        <span style="display: inline-block; width: 98%;  height: 15px; line-height: 15px; text-align: center;">
                            2025-00123
                        </span>
                    </div>
                    </div>
                    <!-- Child -->
                    <div style="display: flex; height: 170px; border-bottom: 0.2px solid green; border-top: 0.2px solid green;">
                        <div style="display: flex; width: 3%; border-right: 0.2px solid green;">
                            <span style="font-size: 15px; font-weight: bold; display: flex; justify-content: center; align-items: center; white-space: wrap; padding: 4px;">C H I L D</span>
                        </div>
                    <div style=" font-size: 10px; display: flex; width: 97%; flex-direction: column;">
                        <!-- NAME -->
                        <div style="display: flex; height: 40px; width: 100%; border-bottom: 0.2px solid green;"> 
                        <div style="display: flex; width: 8%;">
                        <span style="padding-left: 4px; white-space: nowrap;">1. NAME</span>
                        </div>
                        <div style="display: flex; padding-left: 40px;  gap: 27%; width: 92%;">
                            <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                            <span class="field-label-2">(First)</span>
                            <spam style="border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                Richard 
                            </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                            <span class="field-label-2">(Middle)</span>
                            <spam style="border: none; height: 20px;  margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                Niez
                            </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                            <span class="field-label-2">(Last)</span>
                            <spam style="border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                Beniga
                            </spam>
                            </div>
                        </div>
                        </div>
                        <!-- SEX -->
                        <div style="display: flex; height: 40px; width: 100%; border-bottom: 0.2px solid green;"> 
                        <div style="display: flex; width: 30%; border-right: 0.2px solid green;">
                            <div style="display: flex;">
                                <span style="padding-left: 4px; white-space: nowrap;">2. SEX</span>
                            </div>
                            <div style="display: flex; padding-left: 10px;">
                                <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                                <span class="field-label-2">(Male/Female)</span>
                                <spam style="border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                    Male 
                                </spam>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; width: 70%;">
                            <div style="display: flex; width: 20%; ">
                                <span style="padding-left: 4px; white-space: wrap;">3. DATE OF BIRTH</span>
                            </div>
                            <div style="display: flex; padding-left: 40px;  gap: 27%; width: 92%;">
                                <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                                <span class="field-label-2">(Day)</span>
                                <spam style="border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                    29 
                                </spam>
                                </div>
                                <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                                <span class="field-label-2">(Month)</span>
                                <spam style="border: none; height: 20px;  margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                    09
                                </spam>
                                </div>
                                <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                                <span class="field-label-2">(Year)</span>
                                <spam style="border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                    2025
                                </spam>
                                </div>
                            </div>    
                        </div>
                        </div>
                        <!-- PLACE OF BIRTH -->
                        <div style="display: flex; height: 40px; width: 100%; border-bottom: 0.2px solid green;"> 
                            <div style="display: flex; width: 10%;">
                            <span style="padding-left: 4px; white-space: wrap;">4. PLACE OF BIRTH</span>
                            </div>
                            <div style="display: flex; justify-content: space-evenly; width: 90%;">
                            <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                <span class="field-label-2">(Name of Hospital/Clinic/Institution/House No., St., Barangay)</span>
                                <spam style="border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 2px;">
                                    Richard 
                                </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                <span class="field-label-2">(City/Municipality)</span>
                                <spam style="border: none; height: 20px;  margin: 0; font-size: 10px; text-align: center; padding-top: 13px;">
                                Niez
                                </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                <span class="field-label-2">(Province)</span>
                                <spam style="border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 13px;">
                                Beniga
                                </spam>
                            </div>
                            </div>
                        </div>
                        <!-- TYPE OF BIRTH -->
                        <div style="display: flex; height: 50px; width: 100%;"> 
                        <div style="display: flex; width: 20%; border-right: 0.2px solid green;">
                            <div style="display: flex; flex-direction: column;">
                            <span style="white-space: wrap; padding-left: 4px;">5a. TYPE OF BIRTH</span>
                            <span class="field-label-2" style="padding-left: 20px;">(Single, Twin, Triplet, etc)</span>
                            <div style="display: flex; justify-content: center;">
                                <spam style="width: 100px; border: none; border-bottom: 0.1px solid green; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em; padding-top: 8px;">
                                    triplet 
                                </spam>
                            </div>
                            </div>
                        </div>
                        <div style="display: flex; width: 30%; border-right: 0.2px solid green;">
                            <div style="display: flex; flex-direction: column;">
                            <span style="white-space: wrap; padding-left: 4px;">5b. IF MULTIPLE BIRTH, CHILD WAS</span>
                            <span class="field-label-2" style="padding-left: 20px;">(First, Second, Third, etc)</span>
                            <div style="display: flex; justify-content: center;">
                                <spam style="width: 100px; border: none; border-bottom: 0.1px solid green; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em; padding-top: 8px;">
                                    Tenth 
                                </spam>
                            </div>
                            </div>
                        </div>
                        <div style="display: flex; width: 30%; border-right: 0.2px solid green;">
                            <div style="display: flex; flex-direction: column;">
                            <span style="white-space: wrap; padding-left: 4px;">5c. BIRTH ORDER <span class="field-label-small-text">(Order of this birth to previous live births, including fatal deaths)</span></span>
                            <span class="field-label-2" style="padding-left: 20px;">(First, Second, Third, etc)</span>
                            <div style="display: flex; justify-content: center;">
                                <spam style="width: 100px; border: none; border-bottom: 0.1px solid green; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em;">
                                    First 
                                </spam>
                            </div>
                            </div>
                        </div>
                        <div style="display: flex; width: 20%;">
                            <div style="display: flex; flex-direction: column;">
                            <span style="white-space: wrap; padding-left: 4px;">6. WEIGHT AT BIRTH</span>
                            <div style="display: flex; justify-content: center;">
                                <spam style="width: 100px; border: none; border-bottom: 0.1px solid green; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em; padding-top: 20px;">
                                    5.5 
                                </spam>
                                <spam style="padding-top: 20px;">grams</spam>
                            </div>
                            </div>
                        </div>

                        </div>

                    </div>
                    </div>

                    <!-- MOTHER -->
                    <div style="display: flex; height: 170px; border-bottom: 0.2px solid green; border-top: 0.2px solid green;">
                    <div style="display: flex; width: 3%; border-right: 0.2px solid green;">
                        <span style="font-size: 15px; font-weight: bold; display: flex; justify-content: center; align-items: center; white-space: wrap; padding: 4px;">M O T H E R</span>
                    </div>
                    <div style=" font-size: 10px; display: flex; width: 97%; flex-direction: column;">
                        <!-- MAIDEN NAME -->
                        <div style="display: flex; height: 40px; width: 100%; border-bottom: 0.2px solid green;"> 
                        <div style="display: flex; width: 8%;">
                        <span style="padding-left: 4px; white-space: wrap;">7.MAIDEN NAME</span>
                        </div>
                        <div style="display: flex; padding-left: 40px;  gap: 27%; width: 92%;">
                            <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                            <span class="field-label-2">(First)</span>
                            <spam style="border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                Richard 
                            </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                            <span class="field-label-2">(Middle)</span>
                            <spam style="border: none; height: 20px;  margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                Niez
                            </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                            <span class="field-label-2">(Last)</span>
                            <spam style="border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                Beniga
                            </spam>
                            </div>
                        </div>
                        </div>
                        <!-- CITIZENSHIP -->
                        <div style="display: flex; height: 40px; width: 100%; border-bottom: 0.2px solid green;"> 
                        <div style="display: flex; width: 50%; border-right: 0.2px solid green;">
                            <div style="display: flex;">
                                <span style="padding-left: 4px; white-space: nowrap;">8. CITIZENSHIP</span>
                            </div>
                                <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                                <spam style="border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 20px;">
                                    Filipino 
                                </spam>
                            </div>
                        </div>
                        <div style="display: flex; width: 50%; ">
                            <div style="display: flex;">
                            <span style="padding-left: 4px; white-space: nowrap;">9. RELIGION/RELIGIOUS SECT</span>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                                <spam style="border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 20px;">
                                    Baptist 
                                </spam>
                            </div>
                        </div>
                        </div>
                        <!-- TOTAL NUMBER OF CHILDREN BORN ALIVE -->
                        <div style="display: flex; height: 50px; width: 100%; border-bottom: 0.2px solid green;"> 
                        <div style="display: flex; width: 18%; border-right: 0.2px solid green;">
                            <div style="display: flex; flex-direction: column;">
                            <span style="white-space: wrap; padding-left: 4px;">10a. Total number of children born alive</span>
                            <div style="display: flex; justify-content: center;">
                                <spam style="width: 100px; border: none; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em; padding-top: 8px;">
                                    20 
                                </spam>
                            </div>
                            </div>
                        </div>
                        <div style="display: flex; width: 18%; border-right: 0.2px solid green;">
                            <div style="display: flex; flex-direction: column;">
                            <span style="white-space: wrap; padding-left: 4px;">10b. No. of children still living including this birth</span>
                            <div style="display: flex; justify-content: center;">
                                <spam style="border: none; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em; padding-top: 8px;">
                                    20 
                                </spam>
                            </div>
                            </div>
                        </div>
                        <div style="display: flex; width: 19%; border-right: 0.2px solid green;">
                            <div style="display: flex; flex-direction: column;">
                            <span style="white-space: wrap; padding-left: 4px;">10c. No. of children born alive but are now dead</span>
                            <div style="display: flex; justify-content: center;">
                                <spam style="border: none; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em; padding-top: 8px;">
                                    0 
                                </spam>
                            </div>
                            </div>
                        </div>
                        <div style="display: flex; width: 35%; border-right: 0.2px solid green;">
                            <div style="display: flex; flex-direction: column; width: 100%;">
                            <span style="white-space: wrap; padding-left: 4px;">11. OCCUPATION</span>
                            <div style="display: flex; justify-content: center; ">
                                <spam style=" border: none; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em; padding-top: 10px;">
                                    CEO of Richard Beniga Gwapo Company 
                                </spam>
                            </div>
                            </div>
                        </div>
                        <div style="display: flex; width: 20%;">
                            <div style="display: flex; flex-direction: column;">
                            <span style="white-space: wrap; padding-left: 4px;">12. AGE at the time of this birth <span class="field-label-2">(completed years)</span></span>
                            <div style="display: flex; justify-content: center;">
                                <spam style="border: none; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em; padding-top: 8px;">
                                    triplet 
                                </spam>
                            </div>
                            </div>
                        </div>
                        </div>
                        <!-- RESIDENCE -->
                        <div style="display: flex; height: 40px; width: 100%; "> 
                            <div style="display: flex; width: 12%; white-space: nowrap;">
                            <span style="padding-left: 4px; white-space: wrap;">13. RESIDENCE</span>
                            </div>
                            <div style="display: flex; justify-content: space-evenly; width: 88%;">
                            <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
                                <span class="field-label-2">(House No., St., Barangay)</span>
                                <spam style="border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                    1234 
                                </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
                                <span class="field-label-2">(City/Municipality)</span>
                                <spam style="border: none; height: 20px;  margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                Manila
                                </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
                                <span class="field-label-2">(Province)</span>
                                <spam style="border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                Manila
                                </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
                                <span class="field-label-2">(Country)</span>
                                <spam style="border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                Philippines
                                </spam>
                            </div>
                            </div>
                        </div>

                    </div>


                    </div>
                    <!-- FATHER -->
                    <div style="display: flex; height: 130px; border-bottom: 0.2px solid green; border-top: 0.2px solid green;">
                    <div style="display: flex; width: 3%; border-right: 0.2px solid green;">
                        <spam style="font-size: 15px; font-weight: bold; display: flex; justify-content: center; align-items: center; white-space: wrap; padding: 4px;">F A T H E R</spam>
                    </div>
                    <div style=" font-size: 10px; display: flex; width: 97%; flex-direction: column;">
                        <!-- FATHER NAME -->
                        <div style="display: flex; height: 40px; width: 100%; border-bottom: 0.2px solid green;"> 
                        <div style="display: flex; width: 8%;">
                        <span style="padding-left: 4px; white-space: wrap;">14.NAME</span>
                        </div>
                        <div style="display: flex; padding-left: 40px;  gap: 27%; width: 92%;">
                            <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                            <span class="field-label-2">(First)</span>
                            <spam style="border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                Richard 
                            </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                            <span class="field-label-2">(Middle)</span>
                            <spam style="border: none; height: 20px;  margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                Niez
                            </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                            <span class="field-label-2">(Last)</span>
                            <spam style="border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                Beniga
                            </spam>
                            </div>
                        </div>
                        </div>
                        <!-- CITIZENSHIP -->
                        <div style="display: flex; height: 50px; width: 100%; border-bottom: 0.2px solid green;"> 
                        <div style="display: flex; width: 25%; border-right: 0.2px solid green;">
                            <div style="display: flex; flex-direction: column;">
                            <span style="white-space: wrap; padding-left: 4px;">15. CITIZENSHIP</span>
                            <div style="display: flex; justify-content: center;">
                                <spam style="width: 100px; border: none; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em; padding-top: 8px;">
                                    Filipino 
                                </spam>
                            </div>
                            </div>
                        </div>
                        <div style="display: flex; width: 25%; border-right: 0.2px solid green;">
                            <div style="display: flex; flex-direction: column;">
                            <span style="white-space: wrap; padding-left: 4px;">16. RELIGION/RELIGIOUS SECT</span>
                            <div style="display: flex; justify-content: center;">
                                <spam style="border: none; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em; padding-top: 8px;">
                                    Baptist 
                                </spam>
                            </div>
                            </div>
                        </div>
                        <div style="display: flex; width: 30%; border-right: 0.2px solid green;">
                            <div style="display: flex; flex-direction: column; width: 100%;">
                            <span style="white-space: wrap; padding-left: 4px;">11. OCCUPATION</span>
                            <div style="display: flex; justify-content: center; ">
                                <spam style=" border: none; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em; padding-top: 10px;">
                                    CEO of Richard Beniga Gwapo Company 
                                </spam>
                            </div>
                            </div>
                        </div>
                        <div style="display: flex; width: 20%;">
                            <div style="display: flex; flex-direction: column;">
                            <span style="white-space: wrap; padding-left: 4px;">12. AGE at the time of this birth <span class="field-label-2">(completed years)</span></span>
                            <div style="display: flex; justify-content: center;">
                                <spam style="border: none; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em; padding-top: 8px;">
                                    triplet 
                                </spam>
                            </div>
                            </div>
                        </div>
                        </div>
                        <!-- RESIDENCE -->
                        <div style="display: flex; height: 40px; width: 100%; "> 
                            <div style="display: flex; width: 12%; white-space: nowrap;">
                            <span style="padding-left: 4px; white-space: wrap;">13. RESIDENCE</span>
                            </div>
                            <div style="display: flex; justify-content: space-evenly; width: 88%;">
                            <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
                                <span class="field-label-2">(House No., St., Barangay)</span>
                                <spam style="border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                    1234 
                                </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
                                <span class="field-label-2">(City/Municipality)</span>
                                <spam style="border: none; height: 20px;  margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                Manila
                                </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
                                <span class="field-label-2">(Province)</span>
                                <spam style="border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                Manila
                                </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
                                <span class="field-label-2">(Country)</span>
                                <spam style="border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                Philippines
                                </spam>
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
                
                    <div style="font-size: 14px; display: flex;height: 16px; padding: 1px; width: 100%; border-bottom: 0.2px solid green; ">
                    <span>MARRIAGE OF PARENTS</span>
                    <span style="font-size: 10px; padding-top: 2px; margin-left: 2px;">(If not married accomplish Affidavit of Acknowledgement/Admission of paternity at the back)</span>
                    </div>

                    <!-- DATE OF MARRIAGE -->
                    <div style="font-size: 10px; display: flex; height: 40px; width: 100%;  border-bottom: 0.2px solid green;">
                    <div style="display: flex; width: 40%; border-right: 0.2px solid green;">
                        <div style="display: flex; width: 20%;">
                            <span style="padding-left: 4px; white-space: wrap;">20a. DATE</span>
                        </div>
                        <div style="display: flex; padding-left: 4px; width: 80%; justify-content: space-evenly;">
                            <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                            <span class="field-label-2">(Day)</span>
                            <spam style="border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                29 
                            </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                            <span class="field-label-2">(Month)</span>
                            <spam style="border: none; height: 20px;  margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                09
                            </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                            <span class="field-label-2">(Year)</span>
                            <spam style="border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                2025
                            </spam>
                            </div>
                        </div>    
                    </div>
                    <div style="display: flex; width: 60%;">
                        <div style="display: flex; width: 15%;">
                        <span style="padding-left: 4px; white-space: wrap;">20b. PLACE</span>
                        </div>
                        <div style="display: flex; width: 85%; justify-content: space-evenly;">
                        <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                            <span class="field-label-2">(City/Municipality)</span>
                            <spam style="border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px; ">
                                Sogod 
                            </spam>
                        </div>
                        <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                            <span class="field-label-2">(Province)</span>
                            <spam style="border: none; height: 20px;  margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                            Cebu
                            </spam>
                        </div>
                        <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                            <span class="field-label-2">(Country)</span>
                            <spam style="border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                            Philippines
                            </spam>
                        </div>
                        </div>    
                    </div>
                    </div>

                    <!-- ATTENDANT -->
                    <div style="font-size: 10px; display: flex; height: 40px; width: 100%; border-bottom: 0.2px solid green;">

                    <div style="width: 100%; padding-left: 4px; padding-top: 2px;">
                        <span style=" display: block;">21a. ATTENDANT</span>
                        
                        <div style="display: flex; justify-content: flex-start; margin-top: 10px;">
                            
                            <div style="display: flex; align-items: flex-end; margin-right: 10px;">
                                <span style="border-bottom: 0.2px solid green; width: 20px; height: 1.2em; line-height: 1.2em; margin-right: 2px;">&nbsp;
                                    &#10003; 
                                </span>
                                <span>1 Physician</span>
                            </div>
                
                            <div style="display: flex; align-items: flex-end; margin-right: 10px;">
                                <span style="border-bottom: 0.2px solid green; width: 20px; height: 1.2em; line-height: 1.2em; margin-right: 2px;">&nbsp;
                                    &#10003; 
                                </span>
                                <span>2 Nurse</span>
                            </div>
                
                            <div style="display: flex; align-items: flex-end; margin-right: 10px;">
                                <span style="border-bottom: 0.2px solid green; width: 20px; height: 1.2em; line-height: 1.2em; margin-right: 2px;">&nbsp;
                                    &#10003; 
                                </span>
                                <span>3 Midwife</span>
                            </div>
                
                            <div style="display: flex; align-items: flex-end; margin-right: 10px;">
                                <span style="border-bottom: 0.2px solid green; width: 20px; height: 1.2em; line-height: 1.2em; margin-right: 2px;">&nbsp;
                                    &#10003; 
                                </span>
                                <span>4 Hilot (Traditional Birth Attendant)</span>
                            </div>
                
                            <div style="display: flex; align-items: flex-end; flex-grow: 1;">
                                <span style="border-bottom: 0.2px solid green; width: 20px; height: 1.2em; line-height: 1.2em; margin-right: 2px;">&nbsp;
                                    &#10003; 
                                </span>
                                <span>5 Others (Specify)</span>
                                <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1.2em; line-height: 1.2em; margin:0 5px;">&nbsp;
                                    Secret
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- CERTIFICATION OF ATTENDANT AT BIRTH -->
                <div style="display: flex; flex-direction: column; width: 100%; height: 100px; border-bottom: 0.2px solid green; font-size: 10px; padding-top: 2px;">

                    <div style="padding-left: 4px; padding-right: 4px;">
                        <span>21b. CERTIFICATION OF ATTENDANT AT BIRTH</span>
                        <span style="font-size: 8px; color: green;">(Physician, Nurse, Midwife, Traditional Birth Attendant/Hilot, etc.)</span>
                    </div>
                
                    <div style="display: flex; align-items: flex-end; padding-left: 100px; padding-right: 4px; margin-top: 2px; font-size: 10px;">
                        <span>I hereby certify that I attended the birth of the child who was born alive at </span>
                        <span style="border-bottom: 0.2px solid green; width: 50px; height: 1.2em; line-height: 1.2em; text-align: center; margin: 0 5px;">&nbsp;</span>
                        <span>am/pm on the date of birth specified above.</span>
                    </div>
                
                    <div style="display: flex; flex-grow: 1; padding: 20px 4px 4px 4px;">
                        <div style="display: flex; flex-direction: column; width: 50%; padding-right: 15px;">
                            <div style="display: flex; align-items: flex-end; margin-bottom: 4px;">
                                <span>Signature</span>
                                <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; margin-left: 5px;">&nbsp; Richad</span>
                            </div>
                            <div style="display: flex; align-items: flex-end; margin-bottom: 4px;">
                                <span>Name in Print</span>
                                <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; margin-left: 5px;">&nbsp; Richad</span>
                            </div>
                            <div style="display: flex; align-items: flex-end;" >
                                <span>Title or Position</span>
                                <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; margin-left: 5px;">&nbsp;Richad</span>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; width: 50%; padding-top: 1px;">
                            <div style="display: flex; align-items: flex-end; margin-bottom: 4px;">
                                <span>Address</span>
                                <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; margin-left: 5px;">&nbsp;Richad</span>                 </div>           
                            <div style="display: flex; align-items: flex-end; margin-bottom: 4px;">
                            <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; margin-left: 5px;">&nbsp;Richad</span>
                            </div>                
                            <div style="display: flex; align-items: flex-end;">
                                <span>Date</span>
                                <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; margin-left: 5px;">&nbsp;Richad</span>
                            </div>
                        </div>
                    </div>
                </div>
                    
                <!-- CERTIFICATION OF INFORMANT -->
                <div style="display: flex; flex-direction: column; width: 100%; font-family: Arial, sans-serif; font-size: 10px;">
                <div style="display: flex; height: 135px; border-top: 0.2px solid green;">
            
                    <div style="width: 50%; padding: 4px; border-right: 0.2px solid green; display: flex; flex-direction: column;">
                        
                        <div style="margin-bottom: 2px; ">
                            <span>22. CERTIFICATION OF INFORMANT</span>
                            <span style="display: block; font-size: 9px; margin-top: 2px; padding-left: 40px;">I hereby certify that all information supplied are true and correct to my own.</span>
                            <span style="display: block; font-size: 9px; margin-top: 2px; padding-left: 10px;">knowledge and belief.</span>
                        </div>
            
                        <div style="display: flex; align-items: flex-end; margin-bottom: 5px; margin-top: 4px;">
                            <span>Signature</span>
                            <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                <span style="font-style: italic;">(Signed)</span>
                            </span>
                        </div>
                        
                        <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                            <span>Name in Print</span>
                            <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                JANE S. DELA CRUZ
                            </span>
                        </div>
            
                        <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                            <span>Relationship to the Child</span>
                            <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                Mother
                            </span>
                        </div>
                        
                        <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                            <span>Address</span>
                            <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                0123 Sampaguita St., Sogod, Leyte
                            </span>
                        </div>
            
                        <div style="display: flex; align-items: flex-end;">
                            <span>Date</span>
                            <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                2025-01-15
                            </span>
                        </div>
                    </div>
            
                    <div style="width: 50%; padding: 4px; display: flex; flex-direction: column;">
                        
                        <span style="margin-bottom: 31px;">23. PREPARED BY</span>
            
                        <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                            <span>Signature</span>
                            <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                <span style="font-style: italic;">(Signed)</span>
                            </span>
                        </div>
                        
                        <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                            <span>Name in Print</span>
                            <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                MARIA A. SANTOS
                            </span>
                        </div>
            
                        <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                            <span>Title or Position</span>
                            <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                Hospital Clerk
                            </span>
                        </div>
            
                        <div style="display: flex; align-items: flex-end;">
                            <span>Date</span>
                            <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                2025-01-16
                            </span>
                        </div>
                    </div>
                </div>
            
                <div style="display: flex; height: 100px; border-top: 0.2px solid green; border-bottom: 0.2px solid green;">
            
                    <div style="width: 50%; padding: 4px; border-right: 0.2px solid green; display: flex; flex-direction: column;">
                        
                        <span style="margin-bottom: 15px;">24. RECEIVED BY</span>
            
                        <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                            <span>Signature</span>
                            <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                <span style="font-style: italic;">(Signed)</span>
                            </span>
                        </div>
                        
                        <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                            <span>Name in Print</span>
                            <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                JOSE R. REYES
                            </span>
                        </div>
            
                        <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                            <span>Title or Position</span>
                            <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                Clerk
                            </span>
                        </div>
            
                        <div style="display: flex; align-items: flex-end;">
                            <span>Date</span>
                            <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                2025-01-16
                            </span>
                        </div>
                    </div>
            
                    <div style="width: 50%; padding: 4px; display: flex; flex-direction: column;">
                        
                        <span style="margin-bottom: 15px;">25. REGISTERED BY THE CIVIL REGISTRAR</span>
            
                        <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                            <span>Signature</span>
                            <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                <span style="font-style: italic;">(Signed)</span>
                            </span>
                        </div>
                        
                        <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                            <span>Name in Print</span>
                            <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                ALEX M. GOMEZ
                            </span>
                        </div>
            
                        <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                            <span>Title or Position</span>
                            <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                City Civil Registrar
                            </span>
                        </div>
            
                        <div style="display: flex; align-items: flex-end;">
                            <span>Date</span>
                            <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                2025-01-20
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- REMARKS/ANNOTATIONS (For LCRO/OCRG Use Only) -->
                <div style="padding:0 4px; display: flex; height: 130px;width: 100%; border-top: 0.2px solid green; border-bottom: 0.2px solid green; font-size: 10px; flex-direction: column;">
                    <div style="font-weight: bold; margin: 2px; ">REMARKS/ANNOTATIONS (For LCRO/OCRG Use Only)</div>
                    <textarea style="font-size: 12px; height: 100%; width: 98%; border: none; resize: none;">asdasdasd</textarea>
                </div>

                <!-- TO BE FILLED-UP AT THE OFFICE OF THE CIVIL REGISTRAR -->
                <div style="width: 100%; padding: 4px;">
                    <div style="font-weight: bold; font-size: 11px; margin-bottom: 8px;">
                        TO BE FILLED-UP AT THE OFFICE OF THE CIVIL REGISTRAR
                    </div>
                    <div style="display: flex; align-items: flex-end; width: 100%; justify-content: space-evenly;">
                        
                        <div style="display: flex; flex-direction: column; margin-right: 2px;">
                            <span style="font-size: 10px; text-align: center;">8</span>
                            <div style="display: flex;">
                                <span style="width: 15px; height: 25px; border: 0.2px solid green; border-right: none;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid green;">&nbsp;</span>
                            </div>
                        </div>

                        <div style="display: flex; flex-direction: column; margin-right: 2px;">
                            <span style="font-size: 10px; text-align: center;">9</span>
                            <div style="display: flex;">
                                <span style="width: 15px; height: 25px; border: 0.2px solid green; border-right: none;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid green;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid green;">&nbsp;</span>
                            </div>
                        </div>
                        
                        <div style="display: flex; flex-direction: column; margin-right: 2px;">
                            <span style="font-size: 10px; text-align: center;">11</span>
                            <div style="display: flex;">
                                <span style="width: 15px; height: 25px; border: 0.2px solid green; border-right: none;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid green;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid green;">&nbsp;</span>
                            </div>
                        </div>
                        
                        <div style="display: flex; flex-direction: column; margin-right: 2px;">
                            <span style="font-size: 10px; text-align: center;">13</span>
                            <div style="display: flex;">
                                <span style="width: 15px; height: 25px; border: 0.2px solid green; border-right: none;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid green;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid green;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid green;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid green;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid green;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid green;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid green;">&nbsp;</span>
                            </div>
                        </div>
                        
                        <div style="display: flex; flex-direction: column; margin-right: 2px;">
                            <span style="font-size: 10px; text-align: center;">15</span>
                            <div style="display: flex;">
                                <span style="width: 15px; height: 25px; border: 0.2px solid green; border-right: none;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid green;">&nbsp;</span>
                            </div>
                        </div>

                        <div style="display: flex; flex-direction: column; margin-right: 2px;">
                            <span style="font-size: 10px; text-align: center;">16</span>
                            <div style="display: flex;">
                            <span style="width: 15px; height: 25px; border: 0.2px solid green;">&nbsp;</span>
                            <span style="width: 15px; height: 25px; border: 0.2px solid green;">&nbsp;</span>
                            </div>
                        </div>

                        <div style="display: flex; flex-direction: column; margin-right: 2px;">
                            <span style="font-size: 10px; text-align: center;">17</span>
                            <div style="display: flex;">
                                <span style="width: 15px; height: 25px; border: 0.2px solid green; border-right: none;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid green;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid green;">&nbsp;</span>
                            </div>
                        </div>

                        <div style="display: flex; flex-direction: column; margin-right: 2px;">
                            <span style="font-size: 10px; text-align: center;">19</span>
                            <div style="display: flex;">
                                <span style="width: 15px; height: 25px; border: 0.2px solid green; border-right: none;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid green; border-right: none;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid green;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid green;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid green;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid green;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid green;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid green;">&nbsp;</span>
                            </div>
                        </div>
                    </div>
                </div>

                    <!-- End of Page 1 -->
                    </div>
                </div>

                <!-- Second Page -->
                <div class="page">
                <div class="content">
                    <!-- Affidavit of Acknowledgment/Admission of Paternity -->
                    <div style="width: auto; padding: 4px 10px; font-size: 10px; line-height: 1.2em;">

                    <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 20px; flex-direction: column;">
                        <span style="font-weight: bold; font-size: 14px; display: block;">AFFIDAVIT OF ACKNOWLEDGMENT/ADMISSION OF PATERNITY</span>
                        
                        <div style="display: flex; justify-content: space-between; gap: 100px; font-size: 9px; margin-top: 2px;">
                            <span style="font-weight: bold;">(For births before 3 August 1988)</span>
                            <span style="font-weight: bold;">(For births on or after 3 August 1988)</span>
                        </div>
                    </div>
                
                    <div style="margin-bottom: 30px;">
                        <div style="display: flex; align-items: flex-end; margin-bottom: 8px;">
                            <span style="white-space: nowrap; padding-left: 80px; ">I/We, </span>
                            <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin: 0 5px;">&nbsp;</span>
                            <span style="white-space: wrap;"> and </span>
                            <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px;">&nbsp;</span>
                            <span style="white-space: wrap;">,</span>
                        </div>
                
                        <div style="display: flex; align-items: flex-end; margin-bottom: 8px;">
                            <span style="white-space: wrap;">of legal age, am/are the natural mother and/or father of </span>
                            <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin: 0 5px;">&nbsp;</span>
                            <span style="white-space: nowrap;">, who was</span>
                        </div>
                
                        <div style="display: flex; align-items: flex-end;">
                            <span style="white-space: nowrap;">born on </span>
                            <span style="border-bottom: 0.2px solid green; width: 30%; height: 1em; line-height: 1em; margin: 0 5px;">&nbsp;</span>
                            <span style="white-space: nowrap;"> at </span>
                            <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px;">&nbsp;</span>
                            <span style="white-space: nowrap;">.</span>
                        </div>
                        
                        <div style="margin-top: 14px;">
                            <span style="white-space: wrap; padding-left: 80px">I am / We are executing this affidavit to attest to the truthfulness of the foregoing statements and for purposes of 
                            acknowledging my/our child.</span>
                        </div>
                    </div>
                
                    <div style="display: flex; justify-content: space-around; margin-bottom: 40px; margin-top: 30px;">
                        
                        <div style="width: 50%; text-align: center; padding: 0 20px;">
                            <div style="border-bottom: 0.2px solid green; height: 1em; margin-bottom: 5px;">&nbsp;</div>
                            <span style="font-size: 10px;">(Signature Over Printed Name of Father)</span>
                        </div>
                        <div style="width: 50%; text-align: center; padding: 0 20px;">
                            <div style="border-bottom: 0.2px solid green; height: 1em; margin-bottom: 5px;">&nbsp;</div>
                            <span style="font-size: 10px;">(Signature Over Printed Name of Mother)</span>
                        </div>
                    </div>
                
                    <div style="margin:0 10px 50px 10px; ">
                        <div style="display: flex; align-items: flex-end; margin-bottom: 8px;">
                            <span style="white-space: nowrap; font-weight: bold; padding-left: 80px;">SUBSCRIBED AND SWORN</span>
                            <span style="white-space: nowrap;"> to before me this </span>
                            <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin: 0 5px;">&nbsp;</span>
                            <span style="white-space: nowrap;"> day of </span>
                            <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin: 0 5px;">&nbsp;</span>
                            <span style="white-space: nowrap;">, </span>
                            <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-right: 5px;">&nbsp;</span>
                            <span style="white-space: nowrap;"> by</span>
                        </div>
                
                        <div style="display: flex; align-items: flex-end; margin-bottom: 8px;">
                            <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-right: 5px;">&nbsp;</span>
                            <span style="white-space: nowrap;"> and </span>
                            <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin: 0 5px;">&nbsp;</span>
                            <span style="white-space: nowrap;">, who exhibited to me (his/her)</span>
                        </div>
                
                        <div style="display: flex; align-items: flex-end;">
                            <span style="white-space: nowrap;">Community Tax Cert. No. </span>
                            <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin: 0 5px;">&nbsp;</span>
                            <span style="white-space: nowrap;"> issued on </span>
                            <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin: 0 5px;">&nbsp;</span>
                            <span style="white-space: nowrap;"> at </span>
                            <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px;">&nbsp;</span>
                            <span style="white-space: nowrap;">.</span>
                        </div>
                    </div>
                    
                    <div style="display: flex; justify-content: space-evenly ; align-items: center; margin-top: 40px;">
                        
                        <div style="width: 48%; display: flex; flex-direction: column; padding: 0 20px;">
                            <div style="border-bottom: 0.2px solid green; height: 1em; margin-bottom: 5px;">&nbsp;</div>
                            <span style="font-size: 10px; margin-bottom: 15px; text-align: center;">Signature of the Administering Officer</span>

                            <div style="border-bottom: 0.2px solid green; height: 1em; margin-bottom: 5px;">&nbsp;</div>
                            <span style="font-size: 10px; text-align: center;">Name in Print</span>
                        </div>
                
                        <div style="width: 48%; display: flex; flex-direction: column; padding: 0 20px;">
                            
                            <div style="border-bottom: 0.2px solid green; height: 1em; margin-bottom: 5px;">&nbsp;</div>
                            <span style="font-size: 10px; margin-bottom: 15px; text-align: center;">Position / Title / Designation</span>
                            
                            <div style="border-bottom: 0.2px solid green; height: 1em; margin-bottom: 5px;">&nbsp;</div>
                            <span style="font-size: 10px; text-align: center;">Address</span>
                        </div>
                    </div>
                </div>

                <!-- Affidavit for Delayed Registration of Birth -->
                <div style="border-top: 2px solid green; padding: 4px 10px; font-family: Arial, sans-serif; font-size: 11px; line-height: 1.5;">

                    <div style="text-align: center; margin-bottom: 14px;">
                        <span style="font-weight: bold; font-size: 14px; display: block;">AFFIDAVIT FOR DELAYED REGISTRATION OF BIRTH</span>
                        <span style="font-size: 9px; display: block;">(To be accomplished by the hospital/clinic administrator, father, mother, or guardian or the person himself if 18 years old or over.)</span>
                    </div>
                
                    <div style="margin-bottom: 14px; font-size: 10px;">
                        <div style="display: flex; align-items: flex-end; margin-bottom: 8px;">
                            <span style="white-space: nowrap; margin-left: 80px;">I</span>
                            <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; text-align: center;">JANE S. DELA CRUZ</span>
                            <span style="white-space: nowrap; margin: 0 5px;">, of legal age, single/married/divorced/widow/widower, with</span>
                        </div>
                        <div style="display: flex; align-items: flex-end; margin-bottom: 8px;">
                            <span style="white-space: nowrap;">residence and postal address at </span>
                            <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px; text-align: center;">0123 SAMPAGUITA ST., SOGOD, LEYTE</span>
                            <span style="white-space: nowrap; margin-left: 5px;">,</span>
                        </div>
                        <div style="display: flex; align-items: flex-end; margin-bottom: 20px;">
                            <span style="white-space: nowrap;">after having been duly sworn in accordance with law, do hereby depose and say:</span>
                        </div>
                    </div>
                
                    <div style="font-size: 10px;">
                
                        <div style="margin-bottom: 8px;">
                            <span style="white-space: nowrap;">1. That I am the applicant for the delayed registration of:</span>
                            <div style="display: flex; flex-direction: column; margin-left: 15px;">
                                <div style="display: flex; align-items: flex-end; margin: 5px 0px;">
                                    <span style="border: 0.2px solid green; width: 10px; height: 10px; text-align: center; line-height: 0.8; margin-right: 5px;">&#10003;</span>
                                    <span style="white-space: nowrap;">my birth in </span>
                                    <span style="border-bottom: 0.2px solid green; width: 30%; height: 1em; line-height: 1em; margin: 0 5px; text-align: center;">SOGOD, LEYTE</span>
                                    <span style="white-space: nowrap;"> on </span>
                                    <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px; text-align: center;">JANUARY 1, 2025</span>
                                </div>
                                <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                                    <span style="border: 0.2px solid green; width: 10px; height: 10px; text-align: center; line-height: 0.8; margin-right: 5px;">&nbsp;</span>
                                    <span style="white-space: nowrap;">the birth of </span>
                                    <span style="border-bottom: 0.2px solid green; width: 30%; height: 1em; line-height: 1em; margin: 0 5px; text-align: center;">MARCO DELA CRUZ</span>
                                    <span style="white-space: nowrap;"> who was born in </span>
                                    <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px; text-align: center;">SOGOD, LEYTE</span>
                                </div>
                                <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                                    <span style="white-space: nowrap; margin-left: 15px;">on </span>
                                    <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px; text-align: center;">&nbsp;</span>
                                </div>
                            </div>
                        </div>
                
                        <div style="display: flex; flex-direction: column; margin-bottom: 8px; font-size: 10px; padding: 0 4px;">

                            <div style="display: flex; align-items: flex-end; width: 100%;">
                                <span style="white-space: nowrap;">2. That I/he/she was attended at birth by </span>
                                <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin: 0 5px; text-align: center;">DR. JOSE M. PEREZ</span>
                                <span style="white-space: nowrap;"> who resides at </span>
                            </div>
                        
                            <div style="display: flex; align-items: flex-end; width: 100%; margin-top: 8px;">
                                <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px; text-align: center;">TACLOBAN CITY</span>
                            </div>
                        </div>    
                        <div style="display: flex; align-items: flex-end; margin-bottom: 8px;">
                            <span style="white-space: nowrap;">3. That I am/he/she is a citizen of </span>
                            <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px;">FILIPINO</span>
                        </div>
                
                        <div style="margin-bottom: 8px;">
                            <div style="display: flex; align-items: flex-start; margin-bottom: 8px;">

                                <span style="white-space: nowrap;">4. That my/his/her parents were &nbsp;</span>
                                <span style="border: 0.2px solid green; width: 10px; height: 10px; text-align: center; line-height: 0.8; margin-right: 5px; margin-top: 3px;">&#10003;</span>
                                
                                <div style="display: flex; flex-direction: column; flex-grow: 1; font-size: 10px;">
                            
                                    <div style="display: flex; align-items: flex-end; width: 100%;">
                                        <span style="white-space: nowrap;">married on </span>
                                        <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin: 0 5px; text-align: center;">FEBRUARY 14, 2024</span>
                                    </div>
                            
                                    <div style="display: flex; align-items: flex-end; width: 100%; margin-top: 5px;">
                                        <span style="white-space: nowrap;">at </span>
                                        <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px; text-align: center;">SOGOD, LEYTE</span>
                                    </div>
                                </div>
                            </div>
                                <div style="display: flex; align-items: flex-end; margin-top: 5px; margin-left: 145px;">
                                <span style="border: 0.2px solid green; width: 10px; height: 10px; text-align: center; line-height: 0.8; margin-right: 5px;">&nbsp;</span>
                                <span style="white-space: nowrap;">not married but I/he/she was acknowledged/not acknowledged by my/his/her father whose name is</span>
                            </div>
                            <div style="display: flex; align-items: flex-end; margin-top: 5px; margin-left: 145px;">
                                <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px;">&nbsp;</span>
                            </div>
                        </div>
                
                        <div style="display: flex; align-items: flex-end; margin-bottom: 8px;">
                            <div style="display: flex; flex-direction: column; flex-grow: 1; font-size: 10px;">
                            
                                <div style="display: flex; align-items: flex-end; width: 100%;">
                                <span style="white-space: nowrap;">5. That the reason for the delay in registering my/his/her birth was </span>
                                <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px;">NO IMMEDIATE NEED OF DOCUMENT</span>
                                </div>
                        
                                <div style="display: flex; align-items: flex-end; width: 100%; margin-top: 8px;">
                                <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px;"></span>
                                </div>
                            </div>
                        </div>
                
                        <div style="margin-bottom: 8px;">
                            <div style="display: flex; align-items: flex-end; width: 100%;">
                                <span style="white-space: nowrap;">6. (For the applicant only) That I am married to </span>
                                <span style="border-bottom: 0.2px solid green; width: 30%; height: 1em; line-height: 1em; margin-left: 5px; text-align: center;">CARLO M. DELA CRUZ</span>
                                <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px;">&nbsp;</span>
                                <span style="white-space: nowrap;"> of the said person.</span>
                            </div>
                        
                            <div style="display: flex; align-items: flex-end; margin-top: 8px;">
                                <span style="white-space: nowrap;">(If the applicant is other than the document owner) That I am the </span>
                                <span style="border-bottom: 0.2px solid green; width: 30%; height: 1em; line-height: 1em; margin-left: 5px; text-align: center;">MOTHER</span>
                                <span style="white-space: nowrap;"> of the said person.</span>
                            </div>
                        </div>    
                        <div style="display: flex; align-items: flex-end; margin-bottom: 12px;">
                            <span style="white-space: nowrap;">7. That I am executing this affidavit to attest to the truthfulness of the foregoing statements for all legal intents and purposes.</span>
                        </div>
                        <div style="margin-bottom: 30px;">
                            <div style="padding-left: 80px;">
                                In truth whereof, I have affixed my signature below this
                                <span style="border-bottom: 0.2px solid green;display: inline-block;width: 100px;text-align: center;">Sample</span>
                                day of
                                <span style="border-bottom: 0.2px solid green;display: inline-block;width: 200px;text-align: center;">Sample</span>
                                </div>
                            <div style="padding-left: 0px;">
                                at
                                <span style="border-bottom: 0.2px solid green;display: inline-block;width: 250px;text-align: center;">Southern Leyte</span>,
                                Philippines.
                            </div>
                        </div>
                    </div>
                
                    <div style="display: flex; justify-content: flex-end; margin-bottom: 30px;">
                        
                        <div style="width: 50%; text-align: center;">
                            <div style="border-bottom: 0.2px solid green; height: 1em; margin-bottom: 5px;">&nbsp;</div>
                            <span style="font-size: 10px;">(Signature Over Printed Name of Affiant)</span>
                        </div>
                    </div>
                
                    <div style="margin-bottom: 25px; font-size: 10px;">
                
                        <div style="display: flex; align-items: flex-end; width: 100%;">
                            <span style="white-space: nowrap; font-weight: bold; padding-left: 80px;">SUBSCRIBED AND SWORN</span>
                            <span style="white-space: nowrap;"> to before me this </span>
                            <span style="border-bottom: 0.2px solid green; width: 10%; height: 1em; line-height: 1em; margin: 0 5px; text-align: center;">16th</span>
                            <span style="white-space: nowrap;"> day of </span>
                            <span style="border-bottom: 0.2px solid green; width: 25%; height: 1em; line-height: 1em; margin: 0 5px; text-align: center;">JANUARY</span>
                            <span style="white-space: nowrap;">, </span>
                            <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-right: 5px; text-align: center;">2025</span>
                        </div>
                    
                        <div style="display: flex; align-items: flex-end; width: 100%; margin-top: 8px;">
                            <span style="white-space: nowrap;">Philippines, affiant who exhibited to me his Community Tax Cert.</span>
                            <span style="white-space: nowrap;">issued on </span>
                            <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin: 0 5px; text-align: center;">JANUARY 10, 2025</span>
                        </div>
                        
                        <div style="display: flex; align-items: flex-end; width: 100%; margin-top: 8px;">
                            <span style="white-space: nowrap;"> at </span>
                            <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px; text-align: center;">SOGOD, LEYTE</span>
                        </div>
                    </div>        

                    <div style="display: flex; justify-content: space-evenly ; align-items: center; margin-top: 70px;">
                            
                        <div style="width: 48%; display: flex; flex-direction: column; padding: 0 20px;">
                            <div style="border-bottom: 0.2px solid green; height: 1em; margin-bottom: 5px;">&nbsp;</div>
                            <span style="font-size: 10px; margin-bottom: 15px; text-align: center;">Signature of the Administering Officer</span>

                            <div style="border-bottom: 0.2px solid green; height: 1em; margin-bottom: 5px;">&nbsp;</div>
                            <span style="font-size: 10px; text-align: center;">Name in Print</span>
                        </div>
                
                        <div style="width: 48%; display: flex; flex-direction: column; padding: 0 20px;">
                            
                            <div style="border-bottom: 0.2px solid green; height: 1em; margin-bottom: 5px;">&nbsp;</div>
                            <span style="font-size: 10px; margin-bottom: 15px; text-align: center;">Position / Title / Designation</span>
                            
                            <div style="border-bottom: 0.2px solid green; height: 1em; margin-bottom: 5px;">&nbsp;</div>
                            <span style="font-size: 10px; text-align: center;">Address</span>
                        </div>
                    </div>
                    </div>


                    <!-- end of page 2 -->
                </div>
                </div>
            </div>

            <button id="downloadBtn">Download PDF</button>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
            <script>

                document.getElementById('downloadBtn').addEventListener('click', async () => {
                    const { jsPDF } = window.jspdf;
                    const doc = new jsPDF('p', 'pt', [612, 1008]); // 8.5in x 14in (Legal size) in points

                    const pages = document.querySelectorAll('.page');
                
                    for (let i = 0; i < pages.length; i++) {
                        const canvas = await html2canvas(pages[i], { scale: 2 });
                        const imgData = canvas.toDataURL('image/png');
                        const pdfWidth = doc.internal.pageSize.getWidth();
                        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                
                        if (i > 0) doc.addPage();
                        doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    }
                
                    doc.save('Birth_Certificate.pdf');
                });

            </script>
            </body>
            </html>
    `;
}
module.exports = birthGenerateHTML;