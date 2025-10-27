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
                            <span style="flex-grow:1; display:inline-block; height:1.2em; border-bottom:0.2px solid green; line-height:1.2em; text-align:center; font-weight:600;">
                                ${params.province || ''}
                            </span>
                        </div>
                        <div style="display: flex;">
                            <span>City/Municipality:</span>
                            <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; font-weight:600;">
                            ${params.city || ''}
                        </span>
                        </div>
                    </div>
                    <div style="padding-left: 4px; width: 30%; border-left: 0.2px solid green;">
                        <span>
                            Registry No.
                        </span>
                        <span style="display: inline-block; width: 98%;  height: 15px; line-height: 15px; text-align: center; font-weight:600;">
                            ${params.registry_number || ''}
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
                            <spam style="font-weight:600; border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                ${params.child_first_name || ''} 
                            </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                            <span class="field-label-2">(Middle)</span>
                            <spam style="font-weight:600; border: none; height: 20px;  margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                ${params.child_middle_name || ''} 
                            </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                            <span class="field-label-2">(Last)</span>
                            <spam style="font-weight:600; border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                ${params.child_last_name || ''}
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
                                <spam style="font-weight:600; border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                    ${params.sex || ''} 
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
                                <spam style="font-weight:600; border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                    ${params.date_of_birth.split('-')[2] || ''} 
                                </spam>
                                </div>
                                <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                                <span class="field-label-2">(Month)</span>
                                <spam style="font-weight:600; border: none; height: 20px;  margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                    ${params.date_of_birth.split('-')[1] || ''} 
                                </spam>
                                </div>
                                <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                                <span class="field-label-2">(Year)</span>
                                <spam style="font-weight:600; border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                    ${params.date_of_birth.split('-')[0] || ''} 
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
                                <spam style="font-weight:600; border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 2px;">
                                    ${params.place_of_birth_barangay || ''}  
                                </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                <span class="field-label-2">(City/Municipality)</span>
                                <spam style="font-weight:600; font-weight:600; border: none; height: 20px;  margin: 0; font-size: 10px; text-align: center; padding-top: 13px;">
                                    ${params.place_of_birth_city || ''}
                                </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                <span class="field-label-2">(Province)</span>
                                <spam style="font-weight:600; border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 13px;">
                                    ${params.place_of_birth_province || ''}
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
                                <spam style="font-weight:600; width: 100px; border: none; border-bottom: 0.1px solid green; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em; padding-top: 8px;">
                                    ${params.type_of_birth || ''} 
                                </spam>
                            </div>
                            </div>
                        </div>
                        <div style="display: flex; width: 30%; border-right: 0.2px solid green;">
                            <div style="display: flex; flex-direction: column;">
                            <span style="white-space: wrap; padding-left: 4px;">5b. IF MULTIPLE BIRTH, CHILD WAS</span>
                            <span class="field-label-2" style="padding-left: 20px;">(First, Second, Third, etc)</span>
                            <div style="display: flex; justify-content: center;">
                                <spam style="font-weight:600; width: 100px; border: none; border-bottom: 0.1px solid green; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em; padding-top: 8px;">
                                    ${params.multiple_birth_order || ''} 
                                </spam>
                            </div>
                            </div>
                        </div>
                        <div style="display: flex; width: 30%; border-right: 0.2px solid green;">
                            <div style="display: flex; flex-direction: column;">
                            <span style="white-space: wrap; padding-left: 4px;">5c. BIRTH ORDER <span class="field-label-small-text">(Order of this birth to previous live births, including fatal deaths)</span></span>
                            <span class="field-label-2" style="padding-left: 20px;">(First, Second, Third, etc)</span>
                            <div style="display: flex; justify-content: center;">
                                <spam style="font-weight:600; width: 100px; border: none; border-bottom: 0.1px solid green; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em;">
                                    ${params.birth_order || ''} 
                                </spam>
                            </div>
                            </div>
                        </div>
                        <div style="display: flex; width: 20%;">
                            <div style="display: flex; flex-direction: column;">
                            <span style="white-space: wrap; padding-left: 4px;">6. WEIGHT AT BIRTH</span>
                            <div style="display: flex; justify-content: center;">
                                <spam style="font-weight:600; width: 100px; border: none; border-bottom: 0.1px solid green; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em; padding-top: 20px;">
                                    ${params.birth_weight || ''}
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
                            <spam style="font-weight:600; border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                ${params.maiden_first_name || ''} 
                            </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                            <span class="field-label-2">(Middle)</span>
                            <spam style="font-weight:600; border: none; height: 20px;  margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                ${params.maiden_middle_name || ''}
                            </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                            <span class="field-label-2">(Last)</span>
                            <spam style="font-weight:600; border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                ${params.maiden_last_name || ''}
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
                                <spam style="font-weight:600; border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 20px;">
                                    ${params.citizenship || 'FILIPINO'} 
                                </spam>
                            </div>
                        </div>
                        <div style="display: flex; width: 50%; ">
                            <div style="display: flex;">
                            <span style="padding-left: 4px; white-space: nowrap;">9. RELIGION/RELIGIOUS SECT</span>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                                <spam style="font-weight:600; border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 20px;">
                                    ${params.religion || ''} 
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
                                <spam style="font-weight:600; width: 100px; border: none; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em; padding-top: 8px;">
                                    ${params.children_born_alive || ''} 
                                </spam>
                            </div>
                            </div>
                        </div>
                        <div style="display: flex; width: 18%; border-right: 0.2px solid green;">
                            <div style="display: flex; flex-direction: column;">
                            <span style="white-space: wrap; padding-left: 4px;">10b. No. of children still living including this birth</span>
                            <div style="display: flex; justify-content: center;">
                                <spam style="font-weight:600; border: none; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em; padding-top: 8px;">
                                    ${params.children_still_living || ''} 
                                </spam>
                            </div>
                            </div>
                        </div>
                        <div style="display: flex; width: 19%; border-right: 0.2px solid green;">
                            <div style="display: flex; flex-direction: column;">
                            <span style="white-space: wrap; padding-left: 4px;">10c. No. of children born alive but are now dead</span>
                            <div style="display: flex; justify-content: center;">
                                <spam style="font-weight:600; border: none; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em; padding-top: 8px;">
                                    ${params.children_deceased || ''} 
                                </spam>
                            </div>
                            </div>
                        </div>
                        <div style="display: flex; width: 35%; border-right: 0.2px solid green;">
                            <div style="display: flex; flex-direction: column; width: 100%;">
                            <span style="white-space: wrap; padding-left: 4px;">11. OCCUPATION</span>
                            <div style="display: flex; justify-content: center; ">
                                <spam style="font-weight:600; border: none; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em; padding-top: 10px;">
                                    ${params.occupation || ''}
                                </spam>
                            </div>
                            </div>
                        </div>
                        <div style="display: flex; width: 20%;">
                            <div style="display: flex; flex-direction: column;">
                            <span style="white-space: wrap; padding-left: 4px;">12. AGE at the time of this birth <span class="field-label-2">(completed years)</span></span>
                            <div style="display: flex; justify-content: center;">
                                <spam style="font-weight:600; border: none; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em; padding-top: 8px;">
                                    ${params.age_at_birth || ''} 
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
                                <spam style="font-weight:600; border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                    ${params.residence_house || ''} 
                                </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
                                <span class="field-label-2">(City/Municipality)</span>
                                <spam style="font-weight:600; border: none; height: 20px;  margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                ${params.residence_city || ''}
                                </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
                                <span class="field-label-2">(Province)</span>
                                <spam style="font-weight:600; border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                ${params.residence_province || ''}
                                </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
                                <span class="field-label-2">(Country)</span>
                                <spam style="font-weight:600; border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                ${params.residence_country || ''}
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
                            <spam style="font-weight:600; border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                ${params.father_first_nam || ''} 
                            </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                            <span class="field-label-2">(Middle)</span>
                            <spam style="font-weight:600; border: none; height: 20px;  margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                ${params.father_middle_name || ''} 
                            </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                            <span class="field-label-2">(Last)</span>
                            <spam style="font-weight:600; border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                ${params.father_last_name || ''} 
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
                                <spam style="font-weight:600; width: 100px; border: none; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em; padding-top: 8px;">
                                    ${params.father_citizenship || 'FILIPINO'}  
                                </spam>
                            </div>
                            </div>
                        </div>
                        <div style="display: flex; width: 25%; border-right: 0.2px solid green;">
                            <div style="display: flex; flex-direction: column;">
                            <span style="white-space: wrap; padding-left: 4px;">16. RELIGION/RELIGIOUS SECT</span>
                            <div style="display: flex; justify-content: center;">
                                <spam style="border: none; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em; padding-top: 8px;">
                                    ${params.father_religion || ''} 
                                </spam>
                            </div>
                            </div>
                        </div>
                        <div style="display: flex; width: 30%; border-right: 0.2px solid green;">
                            <div style="display: flex; flex-direction: column; width: 100%;">
                            <span style="white-space: wrap; padding-left: 4px;">11. OCCUPATION</span>
                            <div style="display: flex; justify-content: center; ">
                                <spam style="font-weight:600; border: none; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em; padding-top: 10px;">
                                    ${params.father_occupation || ''}
                                </spam>
                            </div>
                            </div>
                        </div>
                        <div style="display: flex; width: 20%;">
                            <div style="display: flex; flex-direction: column;">
                            <span style="white-space: wrap; padding-left: 4px;">12. AGE at the time of this birth <span class="field-label-2">(completed years)</span></span>
                            <div style="display: flex; justify-content: center;">
                                <spam style="font-weight:600; border: none; margin: 0; font-size: 10px; text-align: center; height: 1.2em; line-height: 1.2em; padding-top: 8px;">
                                    ${params.father_age_at_birth || ''} 
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
                                <spam style="font-weight:600; border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                    ${params.father_residence_street || ''}  
                                </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
                                <span class="field-label-2">(City/Municipality)</span>
                                <spam style="font-weight:600; border: none; height: 20px;  margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                    ${params.father_residence_city || ''}
                                </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
                                <span class="field-label-2">(Province)</span>
                                <spam style="border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                    ${params.father_residence_province || ''}
                                </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
                                <span class="field-label-2">(Country)</span>
                                <spam style="font-weight:600; border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                    ${params.father_residence_country || ''}
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
                            <spam style="font-weight:600; border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                ${params.date_of_marriage.split('-')[2] || ''} 
                            </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                            <span class="field-label-2">(Month)</span>
                            <spam style="font-weight:600; border: none; height: 20px;  margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                ${params.date_of_marriage.split('-')[1] || ''}
                            </spam>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                            <span class="field-label-2">(Year)</span>
                            <spam style="font-weight:600; border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                ${params.date_of_marriage.split('-')[0] || ''}
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
                            <spam style="font-weight:600; border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px; ">
                                ${params.marriage_city || ''} 
                            </spam>
                        </div>
                        <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                            <span class="field-label-2">(Province)</span>
                            <spam style="border: none; height: 20px;  margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                ${params.marriage_province || ''} 
                            </spam>
                        </div>
                        <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                            <span class="field-label-2">(Country)</span>
                            <spam style="font-weight:600; border: none; height: 20px; margin: 0; font-size: 10px; text-align: center; padding-top: 8px;">
                                ${params.marriage_country || ''}
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
                                <span style="font-weight:600; border-bottom: 0.2px solid green; width: 20px; height: 1.2em; line-height: 1.2em; margin-right: 2px;">&nbsp;
                                    ${params.attendant == 'Physician' ? 'X' : ''}
                                </span>
                                <span>1 Physician</span>
                            </div>
                
                            <div style="display: flex; align-items: flex-end; margin-right: 10px;">
                                <span style="font-weight:600; border-bottom: 0.2px solid green; width: 20px; height: 1.2em; line-height: 1.2em; margin-right: 2px;">&nbsp;
                                    ${params.attendant == 'Nurse' ? 'X' : ''}
                                </span>
                                <span>2 Nurse</span>
                            </div>
                
                            <div style="display: flex; align-items: flex-end; margin-right: 10px;">
                                <span style="border-bottom: 0.2px solid green; width: 20px; height: 1.2em; line-height: 1.2em; margin-right: 2px;">&nbsp;
                                   ${params.attendant == 'Midwife' ? 'X' : ''}
                                </span>
                                <span>3 Midwife</span>
                            </div>
                
                            <div style="display: flex; align-items: flex-end; margin-right: 10px;">
                                <span style="font-weight:600; border-bottom: 0.2px solid green; width: 20px; height: 1.2em; line-height: 1.2em; margin-right: 2px;">&nbsp;
                                    ${params.attendant == 'Hilot' ? 'X' : ''}
                                </span>
                                <span>4 Hilot (Traditional Birth Attendant)</span>
                            </div>
                
                            <div style="display: flex; align-items: flex-end; flex-grow: 1;">
                                <span style="font-weight:600; border-bottom: 0.2px solid green; width: 20px; height: 1.2em; line-height: 1.2em; margin-right: 2px;">&nbsp;
                                     ${params.attendant == 'Others' ? 'X' : ''}
                                </span>
                                <span>5 Others (Specify)</span>
                                <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1.2em; line-height: 1.2em; margin:0 5px;">&nbsp;
                                    
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
                                <span style="font-weight:600; flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; margin-left: 5px;">
                                </span>
                            </div>
                            <div style="display: flex; align-items: flex-end; margin-bottom: 4px;">
                                <span>Name in Print</span>
                                <span style="font-weight:600; flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; margin-left: 5px;">
                                  &nbsp; ${params.attendant_name || ''}
                                </span>
                            </div>
                            <div style="display: flex; align-items: flex-end;" >
                                <span>Title or Position</span>
                                <span style="font-weight:600; flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; margin-left: 5px;">
                                &nbsp; ${params.attendant_title || ''}
                                </span>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; width: 50%; padding-top: 1px;">
                            <div style="display: flex; align-items: flex-end; margin-bottom: 4px;">
                                <span>Address</span>
                                <span style="font-weight:600; flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; margin-left: 5px;">
                                &nbsp; ${params.attendant_address || ''}
                                </span>                 
                            </div>           
                            <div style="display: flex; align-items: flex-end; margin-bottom: 4px;">
                            <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; margin-left: 5px;">
                                &nbsp;Richad
                            </span>
                            </div>                
                            <div style="display: flex; align-items: flex-end;">
                                <span>Date</span>
                                <span style="flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; margin-left: 5px;">
                                 &nbsp; ${params.attendant_date_signed || ''}
                                </span>
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
                            <span style="font-weight:600; flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                ${params.informant_name || ''}
                            </span>
                        </div>
            
                        <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                            <span>Relationship to the Child</span>
                            <span style="font-weight:600; flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                ${params.informant_relationship || ''}
                            </span>
                        </div>
                        
                        <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                            <span>Address</span>
                            <span style="font-weight:600; flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                ${params.informant_address || ''}
                            </span>
                        </div>
            
                        <div style="display: flex; align-items: flex-end;">
                            <span>Date</span>
                            <span style="font-weight:600; flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                ${params.informant_date || ''}
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
                            <span style="font-weight:600; flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                ${params.prepared_name || ''}
                            </span>
                        </div>
            
                        <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                            <span>Title or Position</span>
                            <span style="font-weight:600; flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                ${params.prepared_title || ''}
                            </span>
                        </div>
            
                        <div style="display: flex; align-items: flex-end;">
                            <span>Date</span>
                            <span style="font-weight:600; flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                ${params.prepared_date || ''}
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
                            <span style="font-weight:600; flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                ${params.received_name || ''}
                            </span>
                        </div>
            
                        <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                            <span>Title or Position</span>
                            <span style="font-weight:600; flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                ${params.received_title || ''}
                            </span>
                        </div>
            
                        <div style="display: flex; align-items: flex-end;">
                            <span>Date</span>
                            <span style="font-weight:600; flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                ${params.received_title || ''}
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
                            <span style="font-weight:600; flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                ${params.registrar_name || ''}
                            </span>
                        </div>
            
                        <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                            <span>Title or Position</span>
                            <span style="font-weight:600; flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                ${params.registrar_title || ''}
                            </span>
                        </div>
            
                        <div style="display: flex; align-items: flex-end;">
                            <span>Date</span>
                            <span style="font-weight:600; flex-grow: 1; border-bottom: 0.2px solid green; height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                ${params.registrar_date || ''}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- REMARKS/ANNOTATIONS (For LCRO/OCRG Use Only) -->
                <div style="padding:0 4px; display: flex; height: 130px;width: 100%; border-top: 0.2px solid green; border-bottom: 0.2px solid green; font-size: 10px; flex-direction: column;">
                    <div style="font-weight: bold; margin: 2px; ">REMARKS/ANNOTATIONS (For LCRO/OCRG Use Only)</div>
                    <textarea style="font-size: font-weight:600; 12px; height: 100%; width: 98%; border: none; resize: none;">
                        ${params.remarks || ''}
                    </textarea>
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
                            <span style="font-weight:600; border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin: 0 5px;">
                                ${params.mother_name || ''}
                            </span>
                            <span style="white-space: wrap;"> and </span>
                            <span style="font-weight:600; border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px;">
                                ${params.father_name || ''}
                            </span>
                            <span style="white-space: wrap;">,</span>
                        </div>
                
                        <div style="display: flex; align-items: flex-end; margin-bottom: 8px;">
                            <span style="white-space: wrap;">of legal age, am/are the natural mother and/or father of </span>
                            <span style="font-weight:600; border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin: 0 5px;">
                                ${params.child_name || ''}
                            </span>
                            <span style="white-space: nowrap;">, who was</span>
                        </div>
                
                        <div style="display: flex; align-items: flex-end;">
                            <span style="white-space: nowrap;">born on </span>
                            <span style="font-weight:600; border-bottom: 0.2px solid green; width: 30%; height: 1em; line-height: 1em; margin: 0 5px;">
                                ${params.child_birth_date || ''}
                            </span>
                            <span style="white-space: nowrap;"> at </span>
                            <span style="font-weight:600; border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px;">
                                ${params.child_birth_place || ''}
                            </span>
                            <span style="white-space: nowrap;">.</span>
                        </div>
                        
                        <div style="margin-top: 14px;">
                            <span style="white-space: wrap; padding-left: 80px">I am / We are executing this affidavit to attest to the truthfulness of the foregoing statements and for purposes of 
                            acknowledging my/our child.</span>
                        </div>
                    </div>
                
                    <div style="display: flex; justify-content: space-around; margin-bottom: 40px; margin-top: 30px;">
                        
                        <div style="width: 50%; text-align: center; padding: 0 20px;">
                            <div style="font-weight:600; border-bottom: 0.2px solid green; height: 1em; margin-bottom: 5px;">
                                ${params.father_name || ''}
                            </div>
                            <span style="font-size: 10px;">(Signature Over Printed Name of Father)</span>
                        </div>
                        <div style="width: 50%; text-align: center; padding: 0 20px;">
                            <div style="font-weight:600; border-bottom: 0.2px solid green; height: 1em; margin-bottom: 5px;">
                                ${params.mother_name || ''}
                            </div>
                            <span style="font-size: 10px;">(Signature Over Printed Name of Mother)</span>
                        </div>
                    </div>
                
                    <div style="margin:0 10px 50px 10px; ">
                        <div style="display: flex; align-items: flex-end; margin-bottom: 8px;">
                            <span style="white-space: nowrap; font-weight: bold; padding-left: 80px;">SUBSCRIBED AND SWORN</span>
                            <span style="white-space: nowrap;"> to before me this </span>
                            <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin: 0 5px;">
                               &nbsp; ${params.jurat_day || ''}
                            </span>
                            <span style="white-space: nowrap;"> day of </span>
                            <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin: 0 5px;">
                               &nbsp; ${params.jurat_month_year || ''}
                            </span>
                            <span style="white-space: nowrap;">, </span>
                            <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-right: 5px;">
                                &nbsp; ${params.jurat_affiant1 || ''}
                            </span>
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
                            <div style="border-bottom: 0.2px solid green; height: 1em; margin-bottom: 5px;">
                                &nbsp;
                            </div>
                            <span style="font-size: 10px; margin-bottom: 15px; text-align: center;">Signature of the Administering Officer</span>

                            <div style="border-bottom: 0.2px solid green; height: 1em; margin-bottom: 5px;">
                                &nbsp;
                            </div>
                            <span style="font-size: 10px; text-align: center;">Name in Print</span>
                        </div>
                
                        <div style="width: 48%; display: flex; flex-direction: column; padding: 0 20px;">
                            
                            <div style="border-bottom: 0.2px solid green; height: 1em; margin-bottom: 5px;">
                                &nbsp;
                            </div>
                            <span style="font-size: 10px; margin-bottom: 15px; text-align: center;">Position / Title / Designation</span>
                            
                            <div style="border-bottom: 0.2px solid green; height: 1em; margin-bottom: 5px;">
                                &nbsp;
                            </div>
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
                            <span style="font-weight:600; border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; text-align: center;">
                            ${params.affiant_name}
                            </span>
                            <span style="white-space: nowrap; margin: 0 5px;">, of legal age, <span style="font-weight:600;">${params.civil_status}</span>, with</span>
                        </div>
                        <div style="display: flex; align-items: flex-end; margin-bottom: 8px;">
                            <span style="white-space: nowrap;">residence and postal address at </span>
                            <span style="font-weight:600; border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px; text-align: center;">
                                ${params.address}
                            </span>
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
                                    <span style="border: 0.2px solid green; width: 10px; height: 10px; text-align: center; line-height: 0.8; margin-right: 5px;">
                                    
                                    </span>
                                    <span style="white-space: nowrap;">my birth in </span>
                                    <span style="border-bottom: 0.2px solid green; width: 30%; height: 1em; line-height: 1em; margin: 0 5px; text-align: center;">
                                    
                                    </span>
                                    <span style="white-space: nowrap;"> on </span>
                                    <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px; text-align: center;">
                                    
                                    </span>
                                </div>
                                <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                                    <span style="border: 0.2px solid green; width: 10px; height: 10px; text-align: center; line-height: 0.8; margin-right: 5px;">
                                    
                                    </span>
                                    <span style="white-space: nowrap;">the birth of </span>
                                    <span style="border-bottom: 0.2px solid green; width: 30%; height: 1em; line-height: 1em; margin: 0 5px; text-align: center;">
                                    
                                    </span>
                                    <span style="white-space: nowrap;"> who was born in </span>
                                    <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px; text-align: center;">
                                    
                                    </span>
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
                                <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin: 0 5px; text-align: center;">
                                
                                </span>
                                <span style="white-space: nowrap;"> who resides at </span>
                            </div>
                        
                            <div style="display: flex; align-items: flex-end; width: 100%; margin-top: 8px;">
                                <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px; text-align: center;">
                                
                                </span>
                            </div>
                        </div>    
                        <div style="display: flex; align-items: flex-end; margin-bottom: 8px;">
                            <span style="white-space: nowrap;">3. That I am/he/she is a citizen of </span>
                            <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px;">FILIPINO</span>
                        </div>
                
                        <div style="margin-bottom: 8px;">
                            <div style="display: flex; align-items: flex-start; margin-bottom: 8px;">

                                <span style="white-space: nowrap;">4. That my/his/her parents were &nbsp;</span>
                                <span style="border: 0.2px solid green; width: 10px; height: 10px; text-align: center; line-height: 0.8; margin-right: 5px; margin-top: 3px;">
                                
                                </span>
                                
                                <div style="display: flex; flex-direction: column; flex-grow: 1; font-size: 10px;">
                            
                                    <div style="display: flex; align-items: flex-end; width: 100%;">
                                        <span style="white-space: nowrap;">married on </span>
                                        <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin: 0 5px; text-align: center;">
                                        
                                        </span>
                                    </div>
                            
                                    <div style="display: flex; align-items: flex-end; width: 100%; margin-top: 5px;">
                                        <span style="white-space: nowrap;">at </span>
                                        <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px; text-align: center;">
                                        
                                        </span>
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
                                <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px;">
                                
                                </span>
                                </div>
                        
                                <div style="display: flex; align-items: flex-end; width: 100%; margin-top: 8px;">
                                <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px;"></span>
                                </div>
                            </div>
                        </div>
                
                        <div style="margin-bottom: 8px;">
                            <div style="display: flex; align-items: flex-end; width: 100%;">
                                <span style="white-space: nowrap;">6. (For the applicant only) That I am married to </span>
                                <span style="border-bottom: 0.2px solid green; width: 30%; height: 1em; line-height: 1em; margin-left: 5px; text-align: center;">
                                
                                </span>
                                <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px;">&nbsp;</span>
                                <span style="white-space: nowrap;"> of the said person.</span>
                            </div>
                        
                            <div style="display: flex; align-items: flex-end; margin-top: 8px;">
                                <span style="white-space: nowrap;">(If the applicant is other than the document owner) That I am the </span>
                                <span style="border-bottom: 0.2px solid green; width: 30%; height: 1em; line-height: 1em; margin-left: 5px; text-align: center;">
                                
                                </span>
                                <span style="white-space: nowrap;"> of the said person.</span>
                            </div>
                        </div>    
                        <div style="display: flex; align-items: flex-end; margin-bottom: 12px;">
                            <span style="white-space: nowrap;">7. That I am executing this affidavit to attest to the truthfulness of the foregoing statements for all legal intents and purposes.</span>
                        </div>
                        <div style="margin-bottom: 30px;">
                            <div style="padding-left: 80px;">
                                In truth whereof, I have affixed my signature below this
                                <span style="border-bottom: 0.2px solid green;display: inline-block;width: 100px;text-align: center;">
                                    ${params.final_ctc_number || ''}
                                </span>
                                day of
                                <span style="border-bottom: 0.2px solid green;display: inline-block;width: 200px;text-align: center; font-weight:600;">
                                    ${params.final_ctc_issued_on || ''}
                                </span>
                                </div>
                            <div style="padding-left: 0px;">
                                at
                                <span style="border-bottom: 0.2px solid green;display: inline-block;width: 250px;text-align: center; font-weight:600;">
                                    ${params.final_ctc_issued_at || ''}
                                </span>,
                                Philippines.
                            </div>
                        </div>
                    </div>
                
                    <div style="display: flex; justify-content: flex-end; margin-bottom: 30px;">
                        
                        <div style="width: 50%; text-align: center;">
                            <div style="border-bottom: 0.2px solid green; height: 1em; margin-bottom: 5px;">
                                &nbsp;
                            </div>
                            <span style="font-size: 10px;">(Signature Over Printed Name of Affiant)</span>
                        </div>
                    </div>
                
                    <div style="margin-bottom: 25px; font-size: 10px;">
                
                        <div style="display: flex; align-items: flex-end; width: 100%;">
                            <span style="white-space: nowrap; font-weight: bold; padding-left: 80px;">SUBSCRIBED AND SWORN</span>
                            <span style="white-space: nowrap;"> to before me this </span>
                            <span style="border-bottom: 0.2px solid green; width: 10%; height: 1em; line-height: 1em; margin: 0 5px; text-align: center;">
                                &nbsp; ${params.final_jurat_day || ''}
                            </span>
                            <span style="white-space: nowrap;"> day of </span>
                            <span style="border-bottom: 0.2px solid green; width: 25%; height: 1em; line-height: 1em; margin: 0 5px; text-align: center;">
                                &nbsp; ${params.final_jurat_month_year || ''}
                            </span>
                            <span style="white-space: nowrap;">, </span>
                            <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-right: 5px; text-align: center;">
                                &nbsp; ${params.final_jurat_place || ''}
                            </span>
                        </div>
                    
                        <div style="display: flex; align-items: flex-end; width: 100%; margin-top: 8px;">
                            <span style="white-space: nowrap;">Philippines, affiant who exhibited to me his Community Tax Cert.</span>
                            <span style="white-space: nowrap;">issued on </span>
                            <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin: 0 5px; text-align: center;">
                               &nbsp; ${params.final_ctc_issued_on || ''}
                            </span>
                        </div>
                        
                        <div style="display: flex; align-items: flex-end; width: 100%; margin-top: 8px;">
                            <span style="white-space: nowrap;"> at </span>
                            <span style="border-bottom: 0.2px solid green; flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px; text-align: center;">
                                &nbsp; ${params.final_ctc_issued_at || ''}
                            </span>
                        </div>
                    </div>        

                    <div style="display: flex; justify-content: space-evenly ; align-items: center; margin-top: 70px;">
                            
                        <div style="width: 48%; display: flex; flex-direction: column; padding: 0 20px;">
                            <div style="border-bottom: 0.2px solid green; height: 1em; margin-bottom: 5px;">&nbsp;</div>
                            <span style="font-size: 10px; margin-bottom: 15px; text-align: center;">Signature of the Administering Officer</span>

                            <div style="border-bottom: 0.2px solid green; height: 1em; margin-bottom: 5px;">
                                &nbsp; ${params.admin_officer_name}
                            </div>
                            <span style="font-size: 10px; text-align: center;">Name in Print</span>
                        </div>
                
                        <div style="width: 48%; display: flex; flex-direction: column; padding: 0 20px;">
                            
                            <div style="border-bottom: 0.2px solid green; height: 1em; margin-bottom: 5px; font-weight:600;">
                                &nbsp; ${params.admin_officer_position || ''}
                            </div>
                            <span style="font-size: 10px; margin-bottom: 15px; text-align: center;">Position / Title / Designation</span>
                            
                            <div style="border-bottom: 0.2px solid green; height: 1em; margin-bottom: 5px; font-weight:600;">
                                &nbsp; ${params.admin_officer_address || ''}
                            </div>
                            <span style="font-size: 10px; text-align: center;">Address</span>
                        </div>
                    </div>
                    </div>


                    <!-- end of page 2 -->
                </div>
                </div>
            </div>
            </body>
            </html>
    `;
}

function deathGenerateHTML(params) {
    return `
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Death Certificate</title>
            <style>
                .field-label {
                    font-size: 10px;
                }

                .field-label-2 {
                    font-size: 8px;
                    color:blue;
                }

                .field-label-small-text {
                    font-size: 8px;
                    color:blue;
                }
                .field-label-small-text-2 {
                    font-size: 6px;
                    color:blue;
                }


                body {
                    font-family: Arial;
                    margin: 0;
                    padding: 0;
                    background: #f0f0f0;
                }

                .page {
                    width: 8.5in;
                    height: 14in; /* Long bond paper */
                    margin: 20px auto;
                    background: white;
                    box-sizing: border-box;
                    page-break-after: always;
                    position: relative;
                }

                /* Inner content box with 1in margin and blue border */
                .content {
                    position: absolute;
                    top: 0.5in;
                    left: 0.5in;
                    right: 0.5in;
                    bottom: 0.5in;
                    border: 2px solid blue;
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

                .registry-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 2px;
                    margin-bottom: 0;
                    padding-bottom: 20px;
                    border-bottom:  0.2px solid blue; /* line below table */
                    border-top:  0.2px solid blue; /* line below table */
                }

                .registry-table td {
                    vertical-align: top;
                    padding-left: 2px;
                    padding-bottom: 5px;
                }

                .registry-table td.registry-cell {
                    border-left: 0.2px solid blue; 
                    width: 30%; 
                }

                .common-table {
                    width: 100%;
                    border-collapse: collapse;
                    border-bottom:  0.2px solid blue; /* line below table */
                }
                .common-table td {
                    vertical-align: top;
                }
                .common-table td.sex-cell {
                    border-left: 0.2px solid blue; 
                    width: 20%; 
                }

                .common-table td.civi-status-cell {
                    border-left: 0.2px solid blue; 
                    width: 26%; 
                }

                .inline-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .inline-table td {
                    width: 25%; /* evenly distributes NAME, First, Middle, Last */
                }
                .inline-table td:first-child {
                    text-align: left;  /* keep NAME aligned left */
                }

                .birth-table {
                    width: 100%;
                    border-collapse: collapse;
                    border-bottom:  0.2px solid blue; /* line below table */
                }
                .birth-table td {
                    vertical-align: top;
                }
                .birth-table td.date-cell {
                    border-left: 0.2px solid blue; 
                    width: 30%; 
                }   
                .birth-table td.age-cell {
                    border-left: 0.2px solid blue; 
                    width: 40%; 
                }   

                .common-table-2 {
                    width: 100%;
                    border-collapse: collapse;
                    border-bottom:  0.2px solid blue; /* line below table */
                }
                .common-table-2 td {
                    vertical-align: top;
                }
                .common-table-2 td.common-cell-2 {
                    border-left: 0.2px solid blue; 
                    width: auto; 
                }   
                
                @media print {
                    body {
                        background: none;
                    }
                    .page {
                        margin: 0;
                        box-shadow: none;
                        page-break-after: always;
                    }
                }
            </style>
        </head>
        <body>
        <div id="certificate">
        <!-- First Page -->
        <div class="page">
            <div class="content">
            <div class="header">
                <div class="header-left ">
                    <span>&nbsp;Municipal Form No. 103 <br>
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
                CERTIFICATE OF DEATH
                </span>
            </div>

                <!-- Province -->
                <div class="field-label" style="display: flex; height: 40px; border-bottom: 0.2px solid blue; border-top: 0.2px solid blue;  margin-top: 2px;">
                    <div style="padding-left: 4px; display: flex; justify-content:space-evenly;  flex-direction: column; width: 70%; border-right: 0.2px solid blue;">
                    <div style="display: flex; padding-top: 4px;">
                        <span>Province:</span>
                        <span style="font-weight:600px; flex-grow: 1; display:inline-block; height: 1.2em; border-bottom: 0.2px solid blue; height: 1.2em; line-height: 1.2em; text-align: center;">
                        ${params.province || ''}
                        </span>
                    </div>
                    <div style="display: flex;">
                        <span>City/Municipality:</span>
                        <span style="font-weight:600px; flex-grow: 1; border-bottom: 0.2px solid blue; height: 1.2em; line-height: 1.2em; text-align: center;">
                        ${params.city || ''}
                        </span>
                    </div>
                    </div>
                    <div style="padding-left: 4px; width: 30%; border-left: 0.2px solid blue;">
                    <span>
                        Registry No.
                    </span>
                    <span style="font-weight:600px; display: inline-block; width: 98%;  height: 15px; line-height: 15px; text-align: center;">
                        ${params.registry_number || ''}
                    </span>
                    </div>
                </div>
        
            
                <!-- NAME -->
                <div style="width: 100%; font-size: 10px; border-bottom: 0.2px solid blue;">

                    <div style="display: flex; width: 100%;"> 
                
                        <div style="display: flex; height: 45px; width: 80%; border-right: 0.2px solid blue;"> 
                            
                            <div style="display: flex; width: 10%; padding-left: 4px; ">
                                <span style="white-space: nowrap;">1. NAME</span>
                            </div>
                            
                            <div style="display: flex; padding-left: 10px; gap: 18%; width: 90%; justify-content: space-evenly;">
                                
                                <div style="display: flex; flex-direction: column; align-items: center; width: auto; justify-content: flex-start;">
                                    <span class="field-label-small-text" style=" padding-top: 2px;">(First)</span>
                                    <span style="font-weight:600px; height: 20px; font-size: 10px; text-align: center; padding-top: 8px; ">
                                        ${params.first_name || ''}
                                    </span>
                                </div>
                                
                                <div style="display: flex; flex-direction: column; align-items: center; width: auto; justify-content: flex-start;">
                                    <span class="field-label-small-text" style=" padding-top: 2px;">(Middle)</span>
                                    <span style="font-weight:600px; height: 20px; font-size: 10px; text-align: center; padding-top: 8px; ">
                                        ${params.middle_name || ''}
                                    </span>
                                </div>
                                
                                <div style="display: flex; flex-direction: column; align-items: center; width: auto; justify-content: flex-start;">
                                    <span class="field-label-small-text" style=" padding-top: 2px;">(Last)</span>
                                    <span style="font-weight:600px; height: 20px; font-size: 10px; text-align: center; padding-top: 8px; ">
                                        ${params.last_name || ''}
                                    </span>
                                </div>
                            </div>
                        </div>
                
                        <div style="display: flex; height: 40px; width: 20%;"> 
                            
                            <div style="display: flex; width: 100%;">
                                
                                <div style="display: flex; width: 30%;">
                                    <span style="padding-left: 4px; white-space: nowrap;">2. SEX</span>
                                </div>
                                
                                <div style="display: flex; width: 70%; justify-content: center; align-items: flex-start;">
                                    <div style="display: flex; flex-direction: column; align-items: center; width: auto;">
                                        <span class="field-label-small-text" style=" padding-top: 2px;">(Male/Female)</span>
                                        <span style="font-weight:600px; height: 20px; font-size: 10px; text-align: center; padding-top: 8px; ">
                                            MALE ${params.sex || ''}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
                <div style="width:100%; font-size:10px;  border-bottom:0.2px solid blue;">

                    <div style="display:flex; width:100%; height: 55px;">
                
                    <!-- DATE OF DEATH -->
                    <div style="display:flex; flex-direction:column; width:25%; border-right:0.2px solid blue;">
                        
                        <!-- top row -->
                        <div style="display:flex; justify-content:space-between; padding:0 4px;">
                            <span class="field-label">3. DATE OF DEATH</span>
                            <span class="field-label-small-text">(Day, Month, Year)</span>
                        </div>
                
                        <!-- input row -->
                        <div style="display:flex; justify-content:center; align-items:center; height:30px;">
                        <span class="field-value-span" style=" display:inline-block; width:80%;
                            height:12px;
                            font-weight:600px;
                            line-height:12px;
                            font-size:10px;
                            text-align:center;
                            vertical-align:middle;">
                           ${params.date_of_death.split('-')[2] || ''}, ${params.date_of_death.split('-')[1] || ''}, ${params.date_of_death.split('-')[0] || ''}
                        </span>
                        </div>
                    </div>
                
                    <!-- DATE OF BIRTH -->
                    <div style="display:flex; flex-direction:column; width:25%; border-right:0.2px solid blue;">
                        
                        <!-- top row -->
                        <div style="display:flex; justify-content:space-between; padding:0 4px; ">
                            <span class="field-label">4. DATE OF BIRTH</span>
                            <span class="field-label-small-text">(Day, Month, Year)</span>
                        </div>
                
                        <!-- input row -->
                        <div style="display:flex; justify-content:center; align-items:center; height:30px;">
                        <span class="field-value-span" style="
                            display:inline-block;
                            font-weight:600px;
                            width:80%;
                            height:12px;
                            line-height:12px;
                            font-size:10px;
                            text-align:center;
                            vertical-align:middle;">
                            ${params.date_of_birth.split('-')[2] || ''}, ${params.date_of_birth.split('-')[1] || ''}, ${params.date_of_birth.split('-')[0] || ''}
                        </span>
                        </div>
                    </div>
                
                    <!-- AGE AT TIME OF DEATH -->
                    <div style="display:flex; flex-direction:column; width:50%;">
                        
                        <!-- header -->
                        <div style="display:flex; padding:2px 4px; border-bottom:0.2px solid blue; white-space: nowrap;">
                        <span class="field-label">5. AGE AT THE TIME OF DEATH</span>
                        <span class="field-label-small-text" style="padding-top: 2px; margin-left: 2px;">(Fill-in below accdg to age category)</span>
                        </div>
                
                        <!-- categories -->
                        <div style="display:flex; width:100%; flex:1;">
                
                        <!-- a. 1 YEAR OR ABOVE -->
                        <div style="display:flex; flex-direction:column; flex:1; border-right:0.2px solid blue;">
                            <div style="padding-left:4px; border-bottom:0.2px solid blue; white-space:nowrap;">
                            <span class="field-label-2">a. IF 1 YEAR OR ABOVE</span>
                            </div>
                            <div style="display: flex; align-items: center; justify-content: center;">
                            <span class="field-label-small-text-2">(2) Completed years</span>
                            </div>
                            <div style="display:flex; justify-content:center; align-items:center; flex:1;">
                            <span class="field-value-span" style="
                                display:inline-block;
                                font-weight:600px;
                                width:80%;
                                height:12px;
                                line-height:12px;
                                font-size:10px;
                                text-align:center;">
                               ${params.age_years || ''}
                            </span>
                            </div>
                        </div>
                
                        <!-- b. UNDER 1 YEAR -->
                        <div style="display:flex; flex-direction:column; flex:1; border-right:0.2px solid blue;">
                            <div style="padding-left:4px; border-bottom:0.2px solid blue; white-space:nowrap;">
                            <span class="field-label-2">b. IF UNDER 1 YEAR</span>
                            </div>
                            <div style="display:flex; border-top:0.2px solid blue; height: 100%; justify-content: space-evenly;">
                            <div style="display: flex;flex-direction: column; flex:1; align-items:center; border-right:0.2px solid blue; ">
                                <span class="field-label-small-text-2">(1) months</span>
                                    <span class="field-value-span" style="font-weight:600px; display:inline-block; height:1em;line-height:1em;font-size:10px;text-align:center; padding-top: 4px;">
                                    ${params.age_months || ''}
                                </span>      
                            </div>
                            <div style="display: flex; flex:1; flex-direction: column; align-items: center;">
                                <span class="field-label-small-text-2">(0) days</span>
                                <span class="field-value-span" style="font-weight:600px; display:inline-block; height:1em;line-height:1em;font-size:10px;text-align:center; padding-top: 4px;">
                                    ${params.age_days || ''}
                                </span>      
                            </div>
                            </div>
                        </div>
                
                        <!-- c. UNDER 24 HOURS -->
                        <div style="display:flex; flex-direction:column; flex:1;">
                            <div style="padding-left:4px; border-bottom:0.2px solid blue; white-space:nowrap;">
                            <span class="field-label-2">c. IF UNDER 24 HOURS</span>
                            </div>
                            <div style="display:flex; border-top:0.2px solid blue; height: 100%; justify-content: space-evenly;">
                                <div style="display: flex;flex-direction: column; flex:1; align-items:center; border-right:0.2px solid blue; ">
                                <span class="field-label-small-text-2">Hours</span>
                                    <span class="field-value-span" style="font-weight:600px; display:inline-block; height:1em;line-height:1em;font-size:10px;text-align:center; padding-top: 4px;">
                                        ${params.age_hours || ''}
                                    </span>      
                                </div>
                                <div style="display: flex; flex:1; flex-direction: column; align-items: center;">
                                <span class="field-label-small-text-2">Min/Sec</span>
                                <span class="field-value-span" style="font-weight:600px; display:inline-block; height:1em;line-height:1em;font-size:10px;text-align:center; padding-top: 4px;">
                                    ${params.age_minutes || ''}
                                </span>      
                                </div>
                            </div>
                            </div>
                
                        </div>
                    </div>
                
                    </div>
                
                </div>
                        
                <div style="width:100%; font-size:10px; height: 40px;  border-bottom:0.2px solid blue; display:flex;">

                    <!-- 6. PLACE OF DEATH -->
                    <div style="display:flex; flex-direction:column;width: 65%; border-right:0.2px solid blue;">
                    
                    <!-- Header -->
                    <div style="display:flex; padding:0 4px;">
                        <span class="field-label" style="white-space: nowrap;">6. PLACE OF DEATH</span>
                        <span class="field-label-small-text" style="padding-left: 50px;">(Name of Hospital/Institution/House No., St., Brgy, City/Mun., Province)</span>
                    </div>
                
                    <!-- Input -->
                    <div style="display:flex; justify-content:center; align-items:center; height:30px;">
                        <span class="field-value-span" style="font-weight:600px; display:inline-block; width:80%; height:12px; line-height:12px; font-size:10px; text-align:center;">
                            ${params.place_of_death || ''}
                        </span>
                    </div>
                    </div>
                
                    <!-- 7. CIVIL STATUS -->
                    <div style="display:flex; flex-direction:column; flex:3;">
                    
                    <!-- Header -->
                    <div style="display:flex; justify-content:space-between; padding:0 4px;">
                        <span class="field-label">7. CIVIL STATUS</span>
                        <span class="field-label-small-text">(Single / Married / Widow / Widower / etc.)</span>
                    </div>
                
                    <!-- Input -->
                    <div style="display:flex; justify-content:center; align-items:center; height:30px; ">
                        <span class="field-value-span"
                            style="font-weight:600px; display:inline-block; width:80%; height:12px; line-height:12px; font-size:10px; text-align:center;">
                        ${params.civil_status || ''}
                        </span>
                    </div>
                    </div>
                </div>
        
        <!-- 8 - 10 -->
        <div style="width:100%; font-size:10px; height:40px; border-bottom:0.2px solid blue; display:flex;">

            <!-- 8. RELIGION / RELIGIOUS SECT -->
            <div style="display:flex; flex-direction:column; width:25%; border-right:0.2px solid blue;">
        
            <!-- Header -->
            <div style="display:flex; padding:0 4px;">
                <span class="field-label" style="white-space:nowrap;">8. RELIGION / RELIGIOUS SECT</span>
            </div>
        
            <!-- Input -->
            <div style="display:flex; justify-content:center; align-items:center; height:30px;">
                <span class="field-value-span"
                    style="font-weight:600px; display:inline-block; width:80%; height:12px; line-height:12px; font-size:10px; text-align:center;">
                ${params.religion || ''}
                </span>
            </div>
            </div>
        
            <!-- 9. CITIZENSHIP -->
            <div style="display:flex; flex-direction:column; width:25%; border-right:0.2px solid blue;">
        
            <!-- Header -->
            <div style="display:flex; padding:0 4px;">
                <span class="field-label" style="white-space:nowrap;">9. CITIZENSHIP</span>
            </div>
        
            <!-- Input -->
            <div style="display:flex; justify-content:center; align-items:center; height:30px;">
                <span class="field-value-span"
                    style="font-weight:600px; display:inline-block; width:80%; height:12px; line-height:12px; font-size:10px; text-align:center;">
                ${params.citizenship || ''}
                </span>
            </div>
            </div>
        
            <!-- 10. RESIDENCE -->
            <div style="display:flex; flex-direction:column; flex:1;">
        
            <!-- Header -->
            <div style="display:flex; padding:0 4px;">
                <span class="field-label" style="white-space:nowrap;">10. RESIDENCE</span>
                <span class="field-label-small-text" style="padding-left:10px;">
                (House No., St., Brgy, City/Mun., Province, Country)
                </span>
            </div>
        
            <!-- Input -->
            <div style="display:flex; justify-content:center; align-items:center; height:30px;">
                <span class="field-value-span"
                    style="font-weight:600px; display:inline-block; width:80%; height:12px; line-height:12px; font-size:10px; text-align:center;">
                ${params.residence || ''}
                </span>
            </div>
            </div>
        </div>
        
        
        <!-- 11 - 13 -->
        <div style="width:100%; font-size:10px; height:40px; border-bottom:0.2px solid blue; display:flex;">
        
            <!-- 11. OCCUPATION -->
            <div style="display:flex; flex-direction:column; width:25%; border-right:0.2px solid blue;">
        
            <!-- Header -->
            <div style="display:flex; padding:0 4px;">
                <span class="field-label" style="white-space:nowrap;">11. OCCUPATION</span>
            </div>
        
            <!-- Input -->
            <div style="display:flex; justify-content:center; align-items:center; height:30px;">
                <span class="field-value-span"
                    style="font-weight:600px; display:inline-block; width:80%; height:12px; line-height:12px; font-size:10px; text-align:center;">
                ${params.occupation || ''}
                </span>
            </div>
            </div>
        
            <!-- 12. NAME OF MOTHER -->
            <div style="display:flex; flex-direction:column; width:37%; border-right:0.2px solid blue;">
        
            <!-- Header -->
            <div style="display:flex; padding:0 4px;">
                <span class="field-label" style="white-space:nowrap;">12. NAME OF MOTHER</span>
                <span class="field-label-small-text" style="padding-left:10px;">(First, Middle, Last)</span>
            </div>
        
            <!-- Input -->
            <div style="display:flex; justify-content:center; align-items:center; height:30px;">
                <span class="field-value-span" style="font-weight:600px; display:inline-block; width:80%; height:12px; line-height:12px; font-size:10px; text-align:center;">
                    ${params.mother_first_name || ''}, ${params.mother_middle_name || ''}, ${params.mother_last_name || ''}
                </span>
            </div>
            </div>
        
            <!-- 13. NAME OF FATHER -->
            <div style="display:flex; flex-direction:column; flex:1;">
        
            <!-- Header -->
            <div style="display:flex; padding:0 4px;">
                <span class="field-label" style="white-space:nowrap;">13. NAME OF FATHER</span>
                <span class="field-label-small-text" style="padding-left:10px;">(First, Middle, Last)</span>
            </div>
        
            <!-- Input -->
            <div style="display:flex; justify-content:center; align-items:center; height:30px;">
                <span class="field-value-span" style="font-weight:600px; display:inline-block; width:80%; height:12px; line-height:12px; font-size:10px; text-align:center;">
                ${params.father_first_name || ''}, ${params.father_middle_name || ''}, ${params.father_last_name || ''}
                </span>
            </div>
            </div>
        </div>
        
            <hr style="
                border: none;
                border-top: 1px solid blue;
                margin: 0;
                position: absolute;
                left: 0;
                right: 0;
            ">

            <div style="text-align: center; line-height: 0.8;">
                <span style="font-size:12px; font-weight: bold;">
                MEDICAL CERTIFICATE<br>
                </span>
                <span style="font-size:12px;">
                (For ages 0 to 7 days, accomplish items 14-19 at the back)
                </span>
            </div>



        <!-- CAUSES OF DEATH -->
                <div style=" font-size: 10px; margin-top: 5px; line-height: 1.2; border-top: 0.2px solid blue;">

                    <div style="display: flex; justify-content: space-between; padding: 2px 5px; margin-bottom: 5px;">
                    <div style="margin: 0; padding: 0;">
                        19b. CAUSES OF DEATH (If the deceased is aged 8 days and over)
                    </div>
                    <div style="font-weight: 600px; font-style: italic; white-space: nowrap; margin: 0; padding: 0 50px;"> 
                        ${params.cause_of_death || ''}
                    </div>
                </div>

                <ul style="list-style: none; padding: 0; margin: 0;">

                    <li style="display: flex; align-items: flex-end; margin-bottom: 3px;">
                        <div style="display: flex; justify-content: space-between; width: 200px;">
                            <div style="margin: 0 0 0 20px; padding: 0;">I. Immediate cause</div>
                            <div style="margin: 0 5px 0 0; white-space: nowrap; padding: 0;">: a.</div>
                        </div>
                        <span class="field-value-span" style="font-weight: 600px; flex-grow: 1; height: 1.2em; line-height: 1.2em; border-bottom: 0.2px solid blue; margin: 0; padding: 0;">
                            ${params.immediate_cause || ''}
                        </span>
                        <span class="field-value-span" style="flex-grow: 0.5; height: 1.2em; line-height: 1.2em; border-bottom: 0.2px solid blue; margin-left: 15px; padding: 0;">
                            
                        </span>
                    </li>
                
                    <li style="display: flex; align-items: flex-end; margin-bottom: 3px;">
                        <div style="display: flex; justify-content: space-between; width: 200px;">
                            <div style="margin: 0 0 0 30px; padding: 0;">Antecedent cause</div>
                            <div style="margin: 0 5px 0 0; white-space: nowrap; padding: 0;">: b.</div>
                        </div>
                        <span class="field-value-span" style="font-weight: 600px; flex-grow: 1; height: 1.2em; line-height: 1.2em; border-bottom: 0.2px solid blue; margin: 0; padding: 0;">
                            ${params.antecedent_cause || ''}
                        </span>
                        <span class="field-value-span" style="flex-grow: 0.5; height: 1.2em; line-height: 1.2em; border-bottom: 0.2px solid blue; margin-left: 15px; padding: 0;">
                           
                        </span>
                    </li>
                
                    <li style="display: flex; align-items: flex-end; margin-bottom: 8px;">
                        <div style="display: flex; justify-content: space-between; width: 200px;">
                            <div style="margin: 0 0 0 30px; padding: 0;">Underlying cause</div>
                            <div style="margin: 0 5px 0 0; white-space: nowrap; padding: 0;">: c.</div>
                        </div>
                        <span class="field-value-span" style="font-weight: 600px; flex-grow: 1; height: 1.2em; line-height: 1.2em; border-bottom: 0.2px solid blue; margin: 0; padding: 0;">
                            ${params.underlying_cause || ''}
                        </span>
                        <span class="field-value-span" style="flex-grow: 0.5; height: 1.2em; line-height: 1.2em; border-bottom: 0.2px solid blue; margin-left: 15px; padding: 0;">
                            
                        </span>
                    </li>
                
                </ul>
                
                <div style="display: flex; align-items: flex-end; border-bottom: 0.2px solid blue; padding-bottom: 5px;">
                    <div style="margin: 0 5px 0 20px; white-space: nowrap; padding: 0;">
                        II. Other significant conditions contributing to death:
                    </div>
                    <span class="field-value-span" style="flex-grow: 1; height: 1.2em; line-height: 1.2em; border-bottom: 0.2px solid blue; margin: 0; padding: 0;">
                        ${params.other_conditions || ''}
                    </span>
                </div>
                </div>

                <!-- MATERNAL CONDITION -->     
                <div style="border-bottom: 0.2px solid blue; padding: 0 5px">

                    <div style="font-size: 10px; margin: 0 0 10px 0; padding: 0;">
                        19c. MATERNAL CONDITION (If the deceased is female aged 15-49 years old)
                    </div>
                
                    <div class="field-label" style="display: flex; justify-content: space-between; align-items: flex-start; width: auto; margin-left: 20px; margin-right: 20px;">
                
                        <div style="display: flex; align-items: flex-start; margin-right: 15px;">
                            <span class="field-value-span" style="font-weight:600px; display:inline-block; width: 20px; height: 0.8em; line-height:0.8em; border-bottom: 0.2px solid blue; margin-right: 5px; text-align: center;">
                               ${params.maternal_condition == "PREGNANT, NOT IN LABOUR" ? '✓' : '&nbsp;'}
                            </span>
                            <div style="margin: 0; padding: 0;">a. pregnant,<br>not in labour</div>
                        </div>
                
                        <div style="display: flex; align-items: flex-start; margin-right: 15px;">
                            <span class="field-value-span" style="font-weight:600px; display:inline-block; width: 20px; height:0.8em; line-height:0.8em; border-bottom: 0.2px solid blue; margin-right: 5px; text-align: center;">
                                ${params.maternal_condition == "PREGNANT, IN LABOUR" ? '✓' : '&nbsp;'}
                            </span>
                            <div style="margin: 0; padding: 0;">b. pregnant, in<br>labour</div>
                        </div>
                
                        <div style="display: flex; align-items: flex-start; margin-right: 15px;">
                            <span class="field-value-span" style="font-weight:600px; display:inline-block; width: 20px; height:0.8em; line-height:0.8em; border-bottom: 0.2px solid blue; margin-right: 5px; text-align: center;">
                                ${params.maternal_condition == "LESS THAN 42 DAYS AFTER DELIVERY" ? '✓' : '&nbsp;'}
                            </span>
                            <div style="margin: 0; padding: 0;">c. less than 42 days after<br>delivery</div>
                        </div>
                
                        <div style="display: flex; align-items: flex-start; margin-right: 15px;">
                            <span class="field-value-span" style="display:inline-block; width: 20px; height:0.8em; line-height:0.8em; border-bottom: 0.2px solid blue; margin-right: 5px; text-align: center;">
                                ${params.maternal_condition == "42 DAYS TO 1 YEAR AFTER DELIVERY" ? '✓' : '&nbsp;'}
                            </span>
                            <div style="margin: 0; padding: 0;">d. 42 days to 1 year after<br>delivery</div>
                        </div>
                
                        <div style="display: flex; align-items: flex-start;">
                            <span class="field-value-span" style="font-weight:600px; display:inline-block; width: 20px; height:0.8em; line-height:0.8em; border-bottom: 0.2px solid blue; margin-right: 5px; text-align: center;">
                                ${params.maternal_condition == "NONE" ? '✓' : '&nbsp;'}
                            </span>
                            <div style="margin: 0; padding: 0;">e. None of the<br>choices</div>
                        </div>
                
                    </div>
                </div>
                

                <!-- DEATH BY EXTERNAL CAUSES -->
                <div style="width: auto; font-size: 10px; line-height: 1.2; margin-top: 5px; padding: 0 5px 0 5px; border-bottom: 0.2px solid blue;">
                    <div style="display: flex; width: 100%;">
                        <div style="flex-grow: 1; border-right: 0.2px solid blue; ">
                
                            <div style="margin-bottom: 0;">
                                19d. DEATH BY EXTERNAL CAUSES
                            </div>
                
                            <div style="display: flex; align-items: flex-end;">
                                <div style="white-space: nowrap;margin-top: 5px; margin-right: 10px;">
                                    a. Manner of death (<span style="color: blue; font-size: 8px;">Homicide, Suicide, Accident, Legal intervention, etc.</span>)
                                </div>
                                <span class="field-value-span" style="font-weight:600px; flex-grow: 1; display: inline-block; height: 1.2em; line-height: 1.2em; border-bottom: 0.2px solid blue; padding: 0; margin: 0;">
                                    &nbsp; ${params.manner_of_death || ''}
                                </span>
                            </div>
                
                            <div style="display: flex; align-items: flex-end; padding-bottom: 1px;">
                                <div style="white-space: nowrap;margin-top: 5px; margin-right: 10px;">
                                    b. Place of Occurrence of External Cause (<span style="color: blue; font-size: 8px;">e.g. home, farm, factory, street, sea, etc.</span>)
                                </div>
                                <span class="field-value-span" style="font-weight:600px; flex-grow: 1; display: inline-block; height: 1.2em; line-height: 1.2em; border-bottom: 0.2px solid blue; padding: 0; margin: 0;">
                                    &nbsp; ${params.place_of_occurrence || ''}
                                </span>
                            </div>
                
                        </div>
                
                        <div style="width: 20%; text-align: center;">
                            <div style="margin-bottom: 0;">
                                20. AUTOPSY
                            </div>
                            <div style="margin-bottom: 1px; font-size: 8px;">
                                (Yes / No)
                            </div>
                            <span class="field-value-span" style="font-weight:600px; margin-top: 5px; width: 80%; display: inline-block; height: 1.2em; line-height: 1.2em; ">
                                &nbsp; ${params.autopsy || ''}
                            </span>
                        </div>
                    </div>
                </div>
                

            <!-- ATTENDANT -->
            <div style="font-size: 10px; line-height: 1.2; border-bottom: 0.2px solid blue;">
                <div style="display: flex; width: 100%;">
            
                    <div style="flex-grow: 1; padding: 2px 5px; border-right: 1px solid black;">
                        <div style="margin-bottom: 5px;">21a. ATTENDANT</div>
            
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%;">
            
                            <!-- Option 1 -->
                            <div style="display: flex; align-items: flex-start; margin-right: 15px;">
                                <span class="field-value-span" style="display:inline-block; width: 20px; height:0.8em; line-height:0.8em; border-bottom: 0.2px solid blue; margin-right: 5px; text-align: center;">
                                    ${params.attendant == "PRIVATE PHYSICIAN" ? '&nbsp;✓' : '&nbsp;'}
                                </span>
                                <div style="margin: 0; padding: 0;">1 Private<br>Physician</div>
                            </div>
            
                            <!-- Option 2 -->
                            <div style="display: flex; align-items: flex-start; margin-right: 15px;">
                                <span class="field-value-span" style="display:inline-block; width: 20px; height:0.8em; line-height:0.8em; border-bottom: 0.2px solid blue; margin-right: 5px; text-align: center;">
                                    ${params.attendant == "PUBLIC HEALTH OFFICER" ? '&nbsp;✓' : '&nbsp;'}
                                </span>
                                <div style="margin: 0; padding: 0;">2 Public<br>Health Officer</div>
                            </div>
            
                            <!-- Option 3 -->
                            <div style="display: flex; align-items: flex-start; margin-right: 15px;">
                                <span class="field-value-span" style="display:inline-block; width: 20px; height:0.8em; line-height:0.8em; border-bottom: 0.2px solid blue; margin-right: 5px; text-align: center;">
                                   ${params.attendant == "HOSPITAL AUTHORITY" ? '&nbsp;✓' : '&nbsp;'}
                                </span>
                                <div style="margin: 0; padding: 0;">3 Hospital<br>Authority</div>
                            </div>
            
                            <!-- Option 4 -->
                            <div style="display: flex; align-items: flex-start; margin-right: 15px;">
                                <span class="field-value-span" style="display:inline-block; width: 20px; height:0.8em; line-height:0.8em; border-bottom: 0.2px solid blue; margin-right: 5px; text-align: center;">
                                    ${params.attendant == "NONE" ? '&nbsp;✓' : '&nbsp;'}
                                </span>
                                <div style="margin: 0; padding: 0;">4 None</div>
                            </div>
            
                            <!-- Option 5 -->
                            <div style="display: flex; align-items: flex-start;">
                                <span class="field-value-span" style="display:inline-block; width: 20px; height:0.8em; line-height:0.8em; border-bottom: 0.2px solid blue; margin-right: 5px; text-align: center;">
                                     ${params.attendant == "OTHERS" ? '&nbsp;✓' : '&nbsp;'}
                                </span>
                                <div style="margin: 0; padding: 0;">5 Others<br>(Specify)</div>
                            </div>
                        </div>
                    </div>
            
                    <div style="width: 30%; padding: 5px;">
                        <div style="margin-bottom: 15px;">21b. If attended, state duration (mm/dd/yy)</div>
            
                        <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                            <div style="white-space: nowrap;">From</div>
                            <span class="field-value-span" style="width: 80%; display: inline-block; height: 1.2em; line-height: 1.2em; border-bottom: 0.2px solid blue; margin: 0 10px 0 5px; padding: 0;">
                                ${params.attendant_from.split('-')[2] || ''} / ${params.attendant_from.split('-')[1] || ''} / ${params.attendant_from.split('-')[0] || ''}
                            </span>
                            <div style="white-space: nowrap;">To</div>
                            <span class="field-value-span" style="width: 80%; display: inline-block; height: 1.2em; line-height: 1.2em; border-bottom: 0.2px solid blue; padding: 0; margin: 0;">
                                ${params.attendant_to.split('-')[2] || ''} / ${params.attendant_to.split('-')[1] || ''} / ${params.attendant_to.split('-')[0] || ''}
                            </span>
                        </div>
                    </div>
            
                </div>
            </div>
            
            <!-- CERTIFICATION OF DEATH -->
            <div style="font-size: 10px; line-height: 1.2; background-color: white; margin-top: -1px; border-top: 0.2px solid blue; padding:2px 5px;">
                <div style="margin-bottom: 0px;">22. CERTIFICATION OF DEATH</div>
                <div style="margin-bottom: 0px;">
                    <span style="padding-left: 2em;">I hereby certify that the foregoing particulars are correct as near as same can be ascertained and I further certify that I</span>
                    <span style="display:inline-block; width:12px; text-align:center; border: 0.2px solid blue; margin:0 5px;">
                        ${params.attended_deceased == "Yes" ? '&nbsp;✓' : '&nbsp;'}
                    </span> have attended /
                    <span style="display:inline-block; width:12px; text-align:center; border: 0.2px solid blue; margin:0 5px;">
                        ${params.attended_deceased == "NO" ? '&nbsp;✓' : '&nbsp;'}
                    </span> have not attended the deceased and that death occurred at
                    <span class="field-value-span" style="width:50px; display:inline-block; border-bottom:0.2px solid blue; text-align:center;">
                        ${params.time_of_death || ''}
                    </span> am/pm on the date of death specified above.
                </div>
            
                <div style="display: flex; width: 100%; ">
            
                    <ul style="list-style: none; padding: 10px 0 0 0; margin: 0; flex: 1; border-right: 0.2px solid blue;">
                        <li style="display: flex; align-items: flex-end; padding: 0 5px;">
                            <div style="display: flex; margin-top: 5px; justify-content: space-between; width: 120px;">
                                <div style="margin: 0; padding: 0;">Signature</div>
                            </div>
                            <span class="field-value-span" style="font-weight:600; margin-top: 5px; padding-bottom: 1px; width: 100%; display:inline-block; height:1.2em; border-bottom:0.2px solid blue;">
                               
                            </span>
                        </li>
            
                        <li style="display: flex; align-items: flex-end; padding: 0 5px;">
                            <div style="display: flex; margin-top: 5px; justify-content: space-between; width: 120px;">
                                <div style="margin: 0; padding: 0;">Name in Print</div>
                            </div>
                            <span class="field-value-span" style="font-weight:600; margin-top: 5px; padding-bottom: 1px; font-size: 10px; width: 100%; display:inline-block; height:1.2em; border-bottom:0.2px solid blue;">
                                ${params.physician_name || ''}
                            </span>
                        </li>
            
                        <li style="display: flex; align-items: flex-end; padding: 0 5px;">
                            <div style="display: flex; margin-top: 5px; justify-content: space-between; width: 120px;">
                                <div style="margin: 0; padding: 0;">Title or Position</div>
                            </div>
                            <span class="field-value-span" style="font-weight:600; margin-top: 5px; padding-bottom: 1px; font-size: 10px; width: 100%; display:inline-block; height:1.2em; border-bottom:0.2px solid blue;">
                                ${params.physician_title || ''}
                            </span>
                        </li>
            
                        <li style="display: flex; align-items: flex-end; padding: 0 5px;">
                            <div style="display: flex; margin-top: 5px; justify-content: space-between; width: 120px;">
                                <div style="margin: 0; padding: 0;">Address</div>
                            </div>
                            <span class="field-value-span" style="font-weight:600; margin-top: 5px; font-size: 10px; width: 100%; display:inline-block; height:1.2em; border-bottom:0.2px solid blue;">
                                ${params.physician_address || ''}
                            </span>
                        </li>
            
                        <li style="display: flex; align-items: flex-end; padding: 5px 5px 0 5px; justify-content: flex-end;">
                            <div style="white-space: nowrap; margin-right: 5px;">Date</div>
                            <span class="field-value-span" style="font-weight: 600px; margin-top: 5px; font-size: 10px; width: 100px; display:inline-block; height:1.2em; border-bottom:0.2px solid blue;">
                                ${params.physician_date_signed || ''}
                            </span>
                        </li>
                    </ul>    
            
                    <div style="flex: 0.8; padding:0 2px; border-top: 0.2px solid blue;">
                        <div style="font-weight: bold; text-align: left; margin-bottom: 20px; font-size: 11px;">REVIEWED BY:</div>
            
                        <div style="margin-bottom: 5px; text-align: center;">
                            <span class="field-value-span" style="font-weight: 600px; width: 80%; height:1.2em; display:inline-block; border-bottom:0.2px solid blue;">
                                ${params.health_officer_signature || ''}
                            </span>
                            <div style="text-align: center; margin-top: 2px;">Signature Over Printed Name of Health Officer</div>
                        </div>
                        <div style="margin-bottom: 0px; text-align: center; padding-top: 5px;">
                            <span class="field-value-span" style="font-size: 10px; width: 100px; display:inline-block; height:1.2em; border-bottom:0.2px solid blue; margin-left: 5px;">
                                 ${params.health_officer_signed_date || ''}
                            </span>
                            <div style="text-align: center; margin-top: 0px;">Date</div>
                        </div>
                    </div>
            
                </div>
            </div>
            
                <!-- CORPSE DISPOSAL -->
                <div style="font-size: 10px; height: 45px; line-height: 1.2; background-color: white; border-top: 0.2px solid blue; padding: 0 5px;">

                    <div style="display: flex; width: 100%; height: 100%;">
                        <!-- Corpse Disposal -->
                        <div style="width: 35%; padding: 0px; border-right: 0.2px solid blue;">
                            <div style="margin-bottom: 5px;">23. CORPSE DISPOSAL (Burial, Cremation, if others, specify)</div>
                            <span class="field-value-span" style="font-weight:600px; width: 100%; display:block; text-align: center; height:1em;">
                                ${params.disposal_type || ''}
                            </span>
                        </div>
                
                        <!-- Burial/Cremation and Transfer Permits -->
                        <div style="width: 65%; display: flex; ">
                
                            <!-- 24a. Burial/Cremation Permit -->
                            <div style="flex: 1; padding: 0px; border-right: 0.2px solid blue; padding-left:4px">
                                <div style="margin-bottom: 2px;">24a. BURIAL/CREMATION PERMIT</div>
                                <div style="display: flex; align-items: flex-end; margin-bottom:2px;">
                                    <div style="white-space: nowrap; margin-right: 5px;">Number</div>
                                    <span class="field-value-span" style="font-weight:600px; width: 80%; display:inline-block; height:1.2em; border-bottom:0.2px solid blue;">
                                        ${params.permit_number || ''}
                                    </span>
                                </div>
                                <div style="display: flex; align-items: flex-end;">
                                    <div style="white-space: nowrap; margin-right: 5px;">Date Issued</div>
                                    <span class="field-value-span" style="font-weight:600px; width: 80%; display:inline-block; height:1.2em; border-bottom:0.2px solid blue;">
                                        ${params.permit_date || ''}
                                    </span>
                                </div>
                            </div>
                
                            <!-- 24b. Transfer Permit -->
                            <div style="flex: 1; padding-left:4px">
                                <div style="margin-bottom: 2px;">24b. TRANSFER PERMIT</div>
                                <div style="display: flex; align-items: flex-end; margin-bottom:2px;">
                                    <div style="white-space: nowrap; margin-right: 5px;">Number</div>
                                    <span class="field-value-span" style="font-weight:600px; width: 80%; display:inline-block; height:1.2em; border-bottom:0.2px solid blue;">
                                        ${params.transfer_permit || ''}
                                    </span>
                                </div>
                                <div style="display: flex; align-items: flex-end;">
                                    <div style="white-space: nowrap; margin-right: 5px;">Date Issued</div>
                                    <span class="field-value-span" style="font-weight:600px; width: 80%; display:inline-block; height:1.2em; border-bottom:0.2px solid blue;">
                                        ${params.transfer_permit_date || ''}
                                    </span>
                                </div>
                            </div>
                
                        </div>
                    </div>
                </div>
                
        <!-- NAME AND ADDRESS OF CEMETERY OR CREMATORY -->
        <div style="font-size: 10px; border-top: 0.2px solid blue; border-bottom: 0.2px solid blue; padding:2px 5px;">
            <div style="margin-bottom: 10px; margin-top: 2px;">25. NAME AND ADDRESS OF CEMETERY OR CREMATORY</div>
            <span class="field-value-span" style="width:100%; display:inline-block; height:1.2em;">
                ${params.cemetery_name || ''}, ${params.cemetery_address || ''}
            </span>
        </div>

        <!-- CERTIFICATION OF INFORMANT -->
        <div style="font-size: 10px; line-height: 1.2; background-color: white; padding:2px 5px;">

            <div style="display: flex; width: 100%; border-bottom: 0.2px solid blue;">
                <div style="flex: 1; padding: 2px; border-right: 0.2px solid blue;">
                    <div style="font-weight: bold; margin-bottom: 0;">26. CERTIFICATION OF INFORMANT</div>
                    <div style="margin-bottom: 0px; margin-left: 20px; font-size: 9px; text-indent: 20px;">
                        I hereby certify that all information supplied are true and correct to my own knowledge and belief.
                    </div>
            
                    <div style="margin-bottom: 0px; margin-top: 5px; display: flex; align-items: flex-end;">
                        <div style="white-space: nowrap; margin-right: 5px;">Signature</div>
                        <span class="field-value-span" style="flex: 1; display:block; height:1.2em; border-bottom:0.2px solid blue;">
                            ${params.informant_signature || ''}
                        </span>
                    </div>
                    <div style="margin-bottom: 0px; margin-top: 5px; display: flex; align-items: flex-end;">
                        <div style="white-space: nowrap; margin-right: 5px;">Name in Print</div>
                        <span class="field-value-span" style="font-weight:600px; flex: 1; display:block; height:1.2em; border-bottom:0.2px solid blue;">
                            ${params.informant_name || ''}
                        </span>
                    </div>
                    <div style="margin-bottom: 0px; margin-top: 5px; display: flex; align-items: flex-end;">
                        <div style="white-space: nowrap; margin-right: 5px;">Relationship to the Deceased</div>
                        <span class="field-value-span" style="font-weight:600px; flex: 1; display:block; height:1.2em; border-bottom:0.2px solid blue;">
                            ${params.informant_relationship || ''}  
                        </span>
                    </div>
                    <div style="margin-bottom: 0px; margin-top: 5px; display: flex; align-items: flex-end;">
                        <div style="white-space: nowrap; margin-right: 5px;">Address</div>
                        <span class="field-value-span" style="flex: 1; display:block; height:1.2em; border-bottom:0.2px solid blue;">
                            ${params.informant_address || ''}
                        </span>
                    </div>
                    <div style="margin-bottom: 0px; margin-top: 5px; display: flex; align-items: flex-end;">
                        <div style="white-space: nowrap; margin-right: 5px;">Date</div>
                        <span class="field-value-span" style="flex: 1; display:block; height:1.2em; border-bottom:0.2px solid blue;">
                            ${params.informant_date || ''}
                        </span>
                    </div>
                </div>
            
                <div style="flex: 1; padding: 2px;">
                    <div style="font-weight: bold; margin-bottom: 0;">27. PREPARED BY</div>
            
                    <div style="margin-bottom: 0px; margin-top: 25px; display: flex; align-items: flex-end;">
                        <div style="white-space: nowrap; margin-right: 5px;">Signature</div>
                        <span class="field-value-span" style="flex: 1; display:block; height:1.2em; border-bottom:0.2px solid blue;"></span>
                    </div>
                    <div style="margin-bottom: 0px; margin-top: 5px; display: flex; align-items: flex-end;">
                        <div style="white-space: nowrap; margin-right: 5px;">Name in Print</div>
                        <span class="field-value-span" style="flex: 1; display:block; height:1.2em; border-bottom:0.2px solid blue;">
                            ${params.prepared_name || ''}
                        </span>
                    </div>
                    <div style="margin-bottom: 0px; margin-top: 5px; display: flex; align-items: flex-end;">
                        <div style="white-space: nowrap; margin-right: 5px;">Title or Position</div>
                        <span class="field-value-span" style="flex: 1; display:block; height:1.2em; border-bottom:0.2px solid blue;">
                            ${params.prepared_title || ''}
                        </span>
                    </div>
                    <div style="margin-bottom: 0px; margin-top: 5px; display: flex; align-items: flex-end;">
                        <div style="white-space: nowrap; margin-right: 5px;">Date</div>
                        <span class="field-value-span" style="flex: 1; display:block; height:1.2em; border-bottom:0.2px solid blue;">
                            ${params.prepared_date || ''}
                        </span>
                    </div>
                </div>
            </div>
            
            <div style="display: flex; width: 100%; margin-top: 2px;">
                <div style="flex: 1; padding: 2px; border-right: 0.2px solid blue;">
                    <div style="font-weight: bold; margin-bottom: 0;">28. RECEIVED BY</div>
            
                    <div style="margin-bottom: 0px; margin-top: 5px; display: flex; align-items: flex-end;">
                        <div style="white-space: nowrap; margin-right: 5px;">Signature</div>
                        <span class="field-value-span" style="flex: 1; display:block; height:1.2em; border-bottom:0.2px solid blue;"></span>
                    </div>
                    <div style="margin-bottom: 0px; margin-top: 5px; display: flex; align-items: flex-end;">
                        <div style="white-space: nowrap; margin-right: 5px;">Name in Print</div>
                        <span class="field-value-span" style="flex: 1; display:block; height:1.2em; border-bottom:0.2px solid blue;">
                            ${params.received_name || ''}
                        </span>
                    </div>
                    <div style="margin-bottom: 0px; margin-top: 5px; display: flex; align-items: flex-end;">
                        <div style="white-space: nowrap; margin-right: 5px;">Title or Position</div>
                        <span class="field-value-span" style="flex: 1; display:block; height:1.2em; border-bottom:0.2px solid blue;">
                            ${params.received_title || ''}
                        </span>
                    </div>
                    <div style="margin-bottom: 0px; margin-top: 5px; display: flex; align-items: flex-end;">
                        <div style="white-space: nowrap; margin-right: 5px;">Date</div>
                        <span class="field-value-span" style="flex: 1; display:block; height:1.2em; border-bottom:0.2px solid blue;">
                            ${params.received_date || ''}
                        </span>
                    </div>
                </div>
            
                <div style="flex: 1; padding: 2px;">
                    <div style="font-weight: bold; margin-bottom: 0;">29. REGISTERED BY THE CIVIL REGISTRAR</div>
            
                    <div style="margin-bottom: 0px; margin-top: 5px; display: flex; align-items: flex-end;">
                        <div style="white-space: nowrap; margin-right: 5px;">Signature</div>
                        <span class="field-value-span" style="flex: 1; display:block; height:1.2em; border-bottom:0.2px solid blue;">
                        
                        </span>
                    </div>
                    <div style="margin-bottom: 0px; margin-top: 5px; display: flex; align-items: flex-end;">
                        <div style="white-space: nowrap; margin-right: 5px;">Name in Print</div>
                        <span class="field-value-span" style="font-weight:600px; flex: 1; display:block; height:1.2em; border-bottom:0.2px solid blue;">
                            ${params.registrar_name || ''}
                        </span>
                    </div>
                    <div style="margin-bottom: 0px; margin-top: 5px; display: flex; align-items: flex-end;">
                        <div style="white-space: nowrap; margin-right: 5px;">Title or Position</div>
                        <span class="field-value-span" style="font-weight:600px; flex: 1; display:block; height:1.2em; border-bottom:0.2px solid blue;">
                            ${params.registrar_title || ''}
                        </span>
                    </div>
                    <div style="margin-bottom: 0px; margin-top: 5px; display: flex; align-items: flex-end;">
                        <div style="white-space: nowrap; margin-right: 5px;">Date</div>
                        <span class="field-value-span" style="font-weight:600px; flex: 1; display:block; height:1.2em; border-bottom:0.2px solid blue;">
                            ${params.registrar_date || ''}
                        </span>
                    </div>
                </div>
            </div>
            </div>

            <!-- REMARKS/ANNOTATIONS -->
            <div style="font-size: 10px; border-top: 0.2px solid blue; border-bottom: 0.2px solid blue; padding-left: 4px;">
                <div style="margin-bottom: 10px; margin-top: 2px; font-weight: bold;">REMARKS/ANNOTATIONS (For LCRO/OCRG Use Only)</div>
                <textarea style="font-weight:600px; font-size: 12px; width: 98%; height: 90px; border: none; resize: none;">
                    ${params.remarks || ''}
                </textarea>
            </div>
            
            <!-- TO BE FILLED-UP AT THE OFFICE OF THE CIVIL REGISTRAR -->
            <div style="font-size: 10px; line-height: 1; background-color: white;  padding: 5px;">
            
                <div style="font-weight: bold; margin-bottom: 5px;">
                    TO BE FILLED-UP AT THE OFFICE OF THE CIVIL REGISTRAR
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: flex-end; padding: 0 5px;">
                    
                    <div style="margin-right: 15px; text-align: left;">
                        <div style="font-size: 8px;">5</div>
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                    </div>
                    
                    <div style="margin-right: 15px; text-align: left;">
                        <div style="font-size: 8px;">8</div>
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                    </div>
            
                    <div style="margin-right: 15px; text-align: left;">
                        <div style="font-size: 8px;">9</div>
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                    </div>
                    
                    <div style="margin-right: 25px; text-align: left;">
                        <div style="font-size: 8px;">10</div>
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                    </div>
            
                    <div style="margin-right: 15px; text-align: left;">
                        <div style="font-size: 8px;">11</div>
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                    </div>
                    
                    <div style="margin-right: 15px; text-align: left;">
                        <div style="font-size: 8px;">19a(a)/19b</div>
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                    </div>
                    
                    <div style="text-align: left;">
                        <div style="font-size: 8px;">19a(c)</div>
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                        <input type="text" style="width: 12px; height: 18px; border: 0.2px solid blue; padding: 0; margin: 0 1px;">
                    </div>
            
                </div>
            </div>

            </div>
        </div>

        <!-- Second Page -->
        <div class="page">
            <div class="content">

                <!-- FOR CHILDREN AGED 0 TO 7 DAYS -->
                <div style="text-align: center; line-height: 0.8; border-bottom: 0.2px solid blue; padding-bottom: 5px;">
                    <span style="font-size:12px; font-weight: bold;">
                    FOR CHILDREN AGED 0 TO 7 DAYS<br>
                    </span>
                </div>
            <!-- AGE OF MOTHER / METHOD OF DELIVERY / LENGTH OF PREGNANCY -->
            <div style="width:100%; font-size:10px; height:40px; border-bottom:0.2px solid blue; display:flex;">

                <!-- 14. AGE OF MOTHER -->
                <div style="display:flex; flex-direction:column; width:20%; border-right:0.2px solid blue;">
                    <!-- Header -->
                    <div style="padding:0 4px;">
                        <span class="field-label">14. AGE OF MOTHER</span>
                    </div>
                    <!-- Input -->
                    <div style="display:flex; justify-content:center; align-items:center; flex:1;">
                        <span class="field-value-span" 
                            style="font-weight:600px; display:inline-block; width:80%; height:12px; line-height:12px; font-size:10px; text-align:center;">
                            ${params.age_of_mother || ''}
                        </span>
                    </div>
                </div>

                <!-- 15. METHOD OF DELIVERY -->
                <div style="display:flex; flex-direction:column; width:45%; border-right:0.2px solid blue;">
                    <!-- Header -->
                    <div style="display:flex; padding:0 4px;">
                        <span class="field-label">15. METHOD OF DELIVERY</span>
                        <span class="field-label-small-text" style="padding-left:8px;">
                            (Normal spontaneous vertex, if others, specify)
                        </span>
                    </div>
                    <!-- Input -->
                    <div style="display:flex; justify-content:center; align-items:center; flex:1;">
                        <span class="field-value-span" 
                            style="font-weight: 600px; display:inline-block; width:80%; height:12px; line-height:12px; font-size:10px; text-align:center;">
                            ${params.method_of_delivery || ''}
                        </span>
                    </div>
                </div>

                <!-- 16. LENGTH OF PREGNANCY -->
                <div style="display:flex; flex-direction:column; width:35%;">
                    <!-- Header -->
                    <div style="display:flex; padding:0 4px;">
                        <span class="field-label">16. LENGTH OF PREGNANCY</span>
                        <span class="field-label-small-text" style="padding-left:8px;">(in completed weeks)</span>
                    </div>
                    <!-- Input -->
                    <div style="display:flex; justify-content:center; align-items:center; flex:1;">
                        <span class="field-value-span" 
                            style="font-weight:600px; display:inline-block; width:80%; height:12px; line-height:12px; font-size:10px; text-align:center;">
                            ${params.length_of_pregnancy || ''}
                        </span>
                    </div>
                </div>
            </div>


        <!-- TYPE OF BIRTH / IF MULTIPLE BIRTH -->
        <div style="width:100%; font-size:10px; height:40px; border-bottom:0.2px solid blue; display:flex;">

            <!-- 17. TYPE OF BIRTH -->
            <div style="display:flex; flex-direction:column; width:50%; border-right:0.2px solid blue;">
                <!-- Header -->
                <div style="display:flex; padding:0 4px;">
                    <span class="field-label">17. TYPE OF BIRTH</span>
                    <span class="field-label-small-text" style="padding-left:8px;">(Single, Twins, Triplets, etc.)</span>
                </div>
                <!-- Input -->
                <div style="display:flex; justify-content:center; align-items:center; flex:1;">
                    <span class="field-value-span" 
                        style="font-weight:600px; display:inline-block; width:80%; height:12px; line-height:12px; font-size:10px; text-align:center;">
                        ${params.type_of_birth || ''}
                    </span>
                </div>
            </div>

            <!-- 18. IF MULTIPLE BIRTH -->
            <div style="display:flex; flex-direction:column; flex:1;">
                <!-- Header -->
                <div style="display:flex; padding:0 4px;">
                    <span class="field-label">18. IF MULTIPLE BIRTH, CHILD WAS</span>
                    <span class="field-label-small-text" style="padding-left:8px;">(First, Second, Third, etc.)</span>
                </div>
                <!-- Input -->
                <div style="display:flex; justify-content:center; align-items:center; flex:1;">
                    <span class="field-value-span" 
                        style="font-weight:600px; display:inline-block; width:80%; height:12px; line-height:12px; font-size:10px; text-align:center;">
                        ${params.if_multiple_birth || ''}
                    </span>
                </div>
            </div>
        </div>

        <!-- MEDICAL CERTIFICATE -->
                <div style="text-align: center; line-height: 0.8; border-bottom: 0.2px solid blue; padding-bottom: 5px;">
                    <span style="font-size:12px; font-weight: bold;">
                    MEDICAL CERTIFICATE<br>
                    </span>
                </div>

                <!-- CAUSE OF DEATH -->
                <div style="font-size: 10px; display: flex; width: 100%;">
                    <div style="flex: 1; padding: 2px; border-right: 0.2px solid blue;">
                        <div style="font-weight: bold; margin-bottom: 0;">19a. CAUSE OF DEATH</div>
                
                        <ol style="list-style-type: lower-alpha; padding: 0; margin: 0 0 0 20px;">
            
                            <li style="margin-bottom: 0px;">
                                <div style="margin-top: 5px; display: flex; align-items: flex-end;">
                                    <div style="white-space: nowrap; margin-right: 5px;">Main disease/condition of infant</div>
                                    <span class="field-value-span" style="font-weight:600px; flex: 1; display:block; height:1.2em; border-bottom: 0.2px solid blue;">
                                        ${params.main_disease_condition_of_infant || ''}
                                    </span>
                                </div>
                            </li>
                            
                            <li style="margin-bottom: 0px;">
                                <div style="margin-top: 5px; display: flex; align-items: flex-end;">
                                    <div style="white-space: nowrap; margin-right: 5px;">Other diseases/conditions of infant</div>
                                    <span class="field-value-span" style="font-weight:600px; flex: 1; display:block; height:1.2em; border-bottom: 0.2px solid blue;">
                                        ${params.other_diseases_conditions_of_infant || ''}
                                    </span>
                                </div>
                            </li>
                            
                            <li style="margin-bottom: 0px;">
                                <div style="margin-top: 5px; display: flex; align-items: flex-end;">
                                    <div style="white-space: nowrap; margin-right: 5px;">Main maternal disease/condition affecting infant</div>
                                    <span class="field-value-span" style="font-weight:600px; flex: 1; display:block; height:1.2em; border-bottom: 0.2px solid blue;">
                                        ${params.main_maternal_disease_condition_affecting_infant || ''}
                                    </span>
                                </div>
                            </li>
                            
                            <li style="margin-bottom: 0px;">
                                <div style="margin-top: 5px; display: flex; align-items: flex-end;">
                                    <div style="white-space: nowrap; margin-right: 5px;">Other maternal disease/condition affecting infant</div>
                                    <span class="field-value-span" style="font-weight:600px; flex: 1; display:block; height:1.2em; border-bottom: 0.2px solid blue;">
                                        ${params.other_maternal_disease_condition_affecting_infant || ''}
                                    </span>
                                </div>
                            </li>
                            
                            <li style="margin-bottom: 0px;">
                                <div style="margin-top: 5px; display: flex; align-items: flex-end;">
                                    <div style="white-space: nowrap; margin-right: 5px;">Other relevant circumstances</div>
                                    <span class="field-value-span" style="font-weight:600px; flex: 1; display:block; height:1.2em; border-bottom: 0.2px solid blue;">
                                        ${params.other_relevant_circumstances || ''}
                                    </span>
                                </div>
                            </li>
                            
                        </ol>                
                    </div>  
                </div>

                <div style="text-align: center; line-height: 0.8;">
                    <span style="font-size:12px; font-weight: bold;">
                    CONTINUE TO FILL UP ITEM 20<br>
                    </span>
                </div>

                <!-- Divider line inside rectangle -->
                <hr  style="border-bottom: 2px solid blue;height: 8px; border-top: 2px solid blue; background-color: white; margin-top: 5px;"></hr>
                <!-- POSTMARTEM CERTIFICATE OF DEATH -->
                <div style="font-size: 10px; line-height: 1.2;  padding:2px 5px; ">
                    <div style="font-size:12px; font-weight: bold; text-align: center; margin-bottom: 5px;">
                        POSTMARTEM CERTIFICATE OF DEATH
                    </div>
                    
                    <div style="line-height: 1.5; margin-top: 5px; text-indent:100px;">
                        I HEREBY CERTIFY that I have performed an autopsy upon the body of the deceased and that the cause of death was:
                    </div>
                    
                    <div style="line-height: 1.5; margin-bottom: 2px; font-size: 10px;">
                        <span id="field2_line1"
                        style="
                            font-weight: 600px;
                            display: block;
                            width: 100%;
                            border-bottom: 0.2px solid blue;
                            height: 1.2em;
                            margin-top: 5px;
                            white-space: nowrap;
                            overflow: hidden;
                        ">
                            ${params.postmortem_cause || ''}
                        </span>
                    
                        <span id="field2_line2"
                        style="
                            display: block;
                            width: 100%;
                            border-bottom: 0.2px solid blue;
                            height: 1.2em;
                            margin-top: 5px;
                            overflow: hidden;
                        ">
                        
                        </span>
                    </div>
                    
                    
                    <div style="display: flex; width: 100%; padding-top: 30px; line-height: 1.2;">
            
                        <div style="flex: 1; padding-right: 10px;">
                            
                            <div style="margin-top: 5px; display: flex; align-items: flex-end;">
                                <div style="white-space: nowrap; margin-right: 2px;">Signature</div>
                                <span style="flex-grow: 1; display: block; height: 1.2em; border-bottom: 0.2px solid blue; padding: 0; margin: 0;">
                                    ${params.postmortem_signature || ''}
                                </span>
                            </div>
                            
                            <div style="margin-top: 5px; display: flex; align-items: flex-end;">
                                <div style="white-space: nowrap; margin-right: 2px;">Name in Print</div>
                                <span style="font-weight:600px; flex-grow: 1; display: block; height: 1.2em; border-bottom: 0.2px solid blue; padding: 0; margin: 0;">
                                    ${params.postmortem_name || ''}
                                </span>
                            </div>
                            
                            <div style="margin-top: 5px; display: flex; align-items: flex-end;">
                                <div style="white-space: nowrap; margin-right: 2px;">Date</div>
                                <span style="font-weight:600px; flex-grow: 1; display: block; height: 1.2em; border-bottom: 0.2px solid blue; padding: 0; margin: 0;">
                                    ${params.postmortem_date || ''}
                                </span>
                            </div>
                        </div>
                    
                        <div style="flex: 1;">
                            
                            <div style="margin-top: 5px; display: flex; align-items: flex-end;">
                                <div style="white-space: nowrap; margin-right: 2px;">Title/Designation</div>
                                <span style="font-weight:600px; flex-grow: 1; display: block; height: 1.2em; border-bottom: 0.2px solid blue; padding: 0; margin: 0;">
                                    ${params.postmortem_title || ''}
                                </span>
                            </div>
                                                
                            <div style="margin-top: 5px; display: flex; align-items: flex-end;">
                                <div style="white-space: nowrap; margin-right: 2px;">Address</div>
                                <span style="flex-grow: 1; display: block; height: 1.2em; border-bottom: 0.2px solid blue; padding: 0; margin: 0;">
                                    ${params.postmortem_address || ''}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- Divider line inside rectangle -->
                <hr  style="border-bottom: 2px solid blue;height: 8px; border-top: 2px solid blue; background-color: white; margin-top: 2px;"></hr>
                <!-- CERTIFICATION OF EMBALMER -->
                <div style="font-size: 10px; line-height: 1.2; margin:0; padding:0px 5px">
            
                    <div style="font-size:12px; font-weight: bold; text-align: center; margin-bottom: 5px;">
                        CERTIFICATION OF EMBALMER
                    </div>
                    
                    <div style="line-height: 1.5; text-indent: 20px;">
                        I HEREBY CERTIFY that I have embalmed
                        <span style="font-weight:600px; border-bottom: 0.2px solid blue; display: inline-block; width: 400px;">
                            ${params.embalmered_name || ''}
                        </span>
                        following all the regulations prescribed by the Department of Health.
                    </div>
                    
                    <div style="display: flex; width: 100%; line-height: 1.2;padding-top: 30px;">
                        <div style="flex: 1; padding-right: 20px; ">
                            
                            <div style="margin-top: 5px; display: flex; align-items: flex-end;">
                                <div style="white-space: nowrap; margin-right: 2px;">Signature</div>
                                <span style="font-weight:600px; flex-grow: 1; display: block; height: 1.2em; border-bottom: 0.2px solid blue; padding: 0; margin: 0;">
                                    ${params.embalmer_signature || ''}
                                </span>
                            </div>
                            
                            <div style="margin-top: 5px; display: flex; align-items: flex-end;">
                                <div style="white-space: nowrap; margin-right: 2px;">Name in Print</div>
                                <span style="flex-grow: 1; display: block; height: 1.2em; border-bottom: 0.2px solid blue; padding: 0; margin: 0;">
                                     ${params.embalmer_name || ''}
                                </span>
                            </div>
                            
                            <div style="margin-top: 5px; display: flex; align-items: flex-end;">
                                <div style="white-space: nowrap; margin-right: 2px;">Address</div>
                                <span style="flex-grow: 1; display: block; height: 1.2em; border-bottom: 0.2px solid blue; padding: 0; margin: 0;">
                                    ${params.embalmer_address || ''}
                                </span>
                            </div>
                        </div>
                    
                        <div style="flex: 1;">
                            
                            <div style="margin-top: 5px; display: flex; align-items: flex-end;">
                                <div style="white-space: nowrap; margin-right: 2px;">Title/Designation</div>
                                <span style="font-weight:600px; flex-grow: 1; display: block; height: 1.2em; border-bottom: 0.2px solid blue; padding: 0; margin: 0;">
                                    ${params.embalmer_title || ''}
                                </span>
                            </div>
                            
                            <div style="margin-top: 5px; display: flex; align-items: flex-end;">
                                <div style="white-space: nowrap; margin-right: 2px;">License No.</div>
                                <span style="font-weight:600px; flex-grow: 1; display: block; height: 1.2em; border-bottom: 0.2px solid blue; padding: 0; margin: 0;">
                                    ${params.embalmer_license || ''}
                                </span>
                            </div>
                            
                            <div style="margin-top: 5px; display: flex; align-items: flex-end;">
                                <div style="white-space: nowrap; margin-right: 2px;">Issued on</div>
                                <span style="font-weight:600px; flex-grow: 1; display: block; height: 1.2em; border-bottom: 0.2px solid blue; padding: 0; margin: 0;">
                                    ${params.embalmer_issued_on || ''}
                                </span>
                                <div style="white-space: nowrap; margin: 0 2px;">at</div>
                                <span style="font-weight:600px; flex-grow: 1; display: block; height: 1.2em; border-bottom: 0.2px solid blue; padding: 0; margin: 0;">
                                    ${params.embalmer_issued_at || ''}
                                </span>
                            </div>
                            
                            <div style="margin-top: 5px; display: flex; align-items: flex-end;">
                                <div style="white-space: nowrap; margin-right: 2px;">Expiry Date</div>
                                <span style="font-weight:600px; flex-grow: 1; display: block; height: 1.2em; border-bottom: 0.2px solid blue; padding: 0; margin: 0;">
                                    ${params.embalmer_expiry_date || ''}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Divider line inside rectangle -->
                <hr  style="border-bottom: 2px solid blue;height: 8px; border-top: 2px solid blue; background-color: white; margin-top: 5px;"></hr>

                <!-- AFFIDAVIT FOR DELAYED REGISTRATION OF DEATH -->
                <div style="font-size: 10px; line-height: 1.5; background-color: white; padding:2px 5px;">
            
                    <div style="font-weight: bold; text-align: center; margin-bottom: 20px; font-size: 12px;">
                        AFFIDAVIT FOR DELAYED REGISTRATION OF DEATH
                    </div>
                    <div style="margin-bottom: 10px;  ">
                        <span style="padding-left: 80px;">I, </span>
                        <span style="font-weight:600px; border-bottom: 0.2px solid blue; display: inline-block; width: 300px; text-align: center;">
                            ${params.affiant_name || ''}
                        </span>, 
                        of legal age, <span style="${params.affiant_civil_status === 'SINGLE' ? 'text-decoration: underline;' : ''}">single</span>/<span style="${params.affiant_civil_status === 'MARRIED' ? 'text-decoration: underline;' : ''}">married</span>/<span style="${params.affiant_civil_status === 'DIVORCED' ? 'text-decoration: underline;' : ''}">divorced</span>/<span style="${params.affiant_civil_status === 'WIDOW' ? 'text-decoration: underline;' : ''}">widow</span>/<span style="${params.affiant_civil_status === 'WIDOWER' ? 'text-decoration: underline;' : ''}">widower</span>, with residence and postal address
                        <span style="border-bottom: 0.2px solid blue; display: inline-block; width: 500px; text-align: center;">
                            ${params.affiant_address || ''}
                        </span>
                        after being duly sworn in accordance with law, do hereby depose and say:
                    </div>
                    
                    <div style="margin-bottom: 10px; padding-left: 80px;">
                        1. That
                        <span style="font-weight:600px; margin: 3px 2px;border-bottom: 0.2px solid blue; display: inline-block; width: 180px; text-align: center;">
                            ${params.deceased_name || ''}
                        </span>
                        died on
                        <span style="font-weight:600px; margin: 3px 2px;border-bottom: 0.2px solid blue; display: inline-block; width: 120px; text-align: center;">
                            ${params.death_date || ''}
                        </span> in
                        <span style="font-weight:600px; margin: 3px 2px;border-bottom: 0.2px solid blue; display: inline-block; width: 200px; text-align: center;">
                            ${params.death_place || ''}
                        </span>
                        <br>
                        and was buried/cremated in
                        <span style="font-weight:600px; margin: 3px 2px;border-bottom: 0.2px solid blue; display: inline-block; width: 200px; text-align: center;">
                            ${params.delayed_cemetery_name || ''}
                        </span>
                        on
                        <span style="font-weight:600px; margin: 3px 2px;border-bottom: 0.2px solid blue; display: inline-block; width: 200px; text-align: center;">
                            ${params.delayed_cemetery_address || ''}
                        </span>
                    </div>
                    
                    <div style="margin-bottom: 10px; padding-left: 80px;">
                        2. That the deceased at the time of his/her death:
                        
                        <div style="margin-left: 20px; display: flex; flex-direction: column;">
                            
                            <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                                <input type="checkbox" style="width: 12px; height: 12px; margin-right: 5px; border: 0.2px solid blue; " ${params.was_attended == "Yes" ? 'checked' : ''}>
                                <div style="white-space: nowrap; margin-right: 5px;">was attended by</div>
                                
                                <span style="font-weight:600px; border-bottom: 0.2px solid blue; flex-grow: 1; height: 1.4em; text-align: center;">
                                    ${params.attended_by || ''}
                                </span>
                            </div>
                            
                            <div style="display: flex; align-items: flex-end;">
                                <input type="checkbox" style="width: 12px; height: 12px; margin-right: 5px; border: 0.2px solid blue;" ${params.was_attended == "No" ? 'checked' : ''}>
                                was not attended.
                            </div>
                            
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 5px; padding-left: 80px; display: flex; align-items: flex-end;">
                        3. That the cause of death of the deceased was
                        <span style="border-bottom: 0.2px solid blue; flex-grow: 1; height: 1.4em; margin-left: 5px; text-align: center;">
                            ${params.cause_of_death || ''}
                        </span>
                    </div>  

                    <div style="margin-bottom: 10px;padding-left: 80px;display: flex;flex-wrap: wrap;align-items: flex-end;">
                
                    <!-- Label -->
                        <div style="flex-shrink: 0; margin-right: 5px;">
                        4. That the reason for the delay in registering this death was due to
                        </div>
                    
                        <!-- First line -->
                        <span id="field1_line1" style="font-weight:600px; display: inline-block;width: 320px;height: 1.4em;border-bottom: 0.2px solid blue;margin-top: 5px;overflow: hidden;white-space: nowrap;">
                            ${params.reason_for_delay || ''}
                        </span>
                        
                        <!-- Second line -->
                        <span id="field1_line2" style="font-weight:600px; display: block;width: 100%;margin-left: 50px;height: 1.4em;border-bottom: 0.2px solid blue;margin-top: 5px;"></span>
                    </div>

                    <div style="margin-bottom: 10px; padding-left: 80px;">
                        5. That I am executing this affidavit to attest to the truthfulness of the foregoing statements for all legal intents and purposes.
                    </div>
                    <div style="margin-bottom: 30px; line-height: 1.4;">
                        <div style="padding-left: 80px;">
                            In truth whereof, I have affixed my signature below this
                            <span style="font-weight:600px; border-bottom: 0.2px solid blue;display: inline-block;width: 100px;text-align: center;">
                                ${params.jurat_day || ''}
                            </span>
                            day of
                            <span style="font-weight:600px; border-bottom: 0.2px solid blue;display: inline-block;width: 200px;text-align: center;">
                                ${params.jurat_month_year || ''}
                            </span>
                            </div>
                        
                        <div style="padding-left: 0px;">
                            at
                            <span style="font-weight:600px; border-bottom: 0.2px solid blue;display: inline-block;width: 250px;text-align: center;">
                                ${params.jurat_place || ''}
                            </span>,
                            Philippines.
                        </div>
                    
                        <div style="text-align: right; margin-top: 30px;">
                            <div style="display: inline-block; text-align: center;">
                                <span style="display: inline-block;width: 270px;border-bottom: 0.3px solid blue;text-align: center;line-height: 1.2em;">
                                    
                                </span>
                                <div style="font-size: 10px;margin-top: 5px;width: 270px;text-align: center;">
                                    (Signature Over Printed Name of Affiant)
                                </div>
                            </div>
                        </div>
                    </div>
                        
                    
                    <div style="padding-bottom: 10px; padding-top: 5px; line-height: 1.5;">
            
                        <div style="padding-left: 80px;">
                        <strong> SUBSCRIBED AND SWORN to before me this</strong>
                            <span style="font-weight:600px; border-bottom: 0.3px solid blue;display: inline-block;width: 100px;text-align: center;">
                                ${params.ctc_day || ''}
                            </span>
                            day of
                            <span style="font-weight:600px; border-bottom: 0.2px solid blue;display: inline-block;width: 120px;text-align: center;">
                                ${params.ctc_month_year || ''}
                            </span>,
                            <span style="font-weight:600px; border-bottom: 0.2px solid blue;display: inline-block;width: 120px;text-align: center;">
                                ${params.ctc_issued_on || ''}
                            </span> at
                        </div>
                        
                        <div style="padding-left: 0px;">
                            <span style="font-weight:600px; border-bottom: 0.2px solid blue;display: inline-block;width: 200px;text-align: center;">
                                 ${params.ctc_issued_at || ''}
                            </span>,
                            Philippines, affiant who exhibited to me his Community Tax Cert.
                        </div>
                        
                        <div style="margin-top: 5px; padding-left: 0px; ">
                            issued on
                            <span style="font-weight:600px; border-bottom: 0.2px solid blue; display: inline-block; width: 200px; text-align: center;">
                                ${params.ctc_issued_on || ''}
                            </span>
                            at
                            <span style="font-weight:600px; border-bottom: 0.2px solid blue; display: inline-block; width: 200px; text-align: center;">
                                ${params.ctc_issued_at || ''}
                            </span>
                        </div>
                        
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; margin-top: 30px;">
                        <div style="flex: 1; margin-right: 5px; text-align: center;">
                            <span style="font-weight:600px; display: inline-block;width: 300px;border-bottom: 0.3px solid blue;text-align: center;line-height: 1.2em;">
                                ${params.admin_name || ''}
                            </span>
                            <div style="font-size: 10px; text-align: center; margin-top: 5px;">
                                Signature of the Administering Officer
                            </div>
                        </div>
                        <div style="flex: 1; margin-left: 5px; text-align: center;">
                            <span style="font-weight:600px; display: inline-block;width: 300px;border-bottom: 0.3px solid blue;text-align: center;line-height: 1.2em;">
                                ${params.admin_position || ''}
                            </span>
                            <div style="font-size: 10px; text-align: center; margin-top: 5px;">
                                Position / Title / Designation
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 10px;;">
                        <div style="flex: 1; margin-right: 5px; text-align: center;">
                            <span style="display: inline-block;width: 300px;border-bottom: 0.3px solid blue;text-align: center;line-height: 1.2em;">
                                ${params.admin_name || ''}
                            </span>
                            <div style="font-size: 10px; text-align: center; margin-top: 5px;">
                                Name in Print
                            </div>
                        </div>
                        <div style="flex: 1; margin-left: 5px; text-align: center;">
                            <span style="display: inline-block;width: 300px;border-bottom: 0.3px solid blue;text-align: center;line-height: 1.2em;">
                                
                            </span>
                            <div style="font-size: 10px; text-align: center; margin-top: 5px;">
                                ${params.address || ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

        </body>
        </html>
    `;
}

function marriageGenerateHTML(params) {
    return `
        <html lang="en">
            <style>
                .field-label {
                    font-size: 10px;
                }

                .field-label-2 {
                    font-size: 10px;
                    color:rgb(224, 67, 93);
                }

                .field-label-small-text {
                    font-size: 8px;
                    color:rgb(224, 67, 93);
                }
                .field-label-small-text-2 {
                    font-size: 7px;
                    color:rgb(224, 67, 93);
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

                /* Inner content box with 1in margin and blue border */
                .content {
                position: absolute;
                top: 0.5in;
                left: 0.5in;
                right: 0.5in;
                bottom: 0.5in;
                border: 2px solid rgb(224, 67, 93);
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
                            <span>&nbsp;Municipal Form No. 97 <br>
                            <span style="margin-top: 20px;">&nbsp;(Revised January 2007)</span>
                        </div>
                        <div class="header-right">
                            <span>(To be accomplished in quadruplicate using rgb(224, 67, 93) ink) &nbsp;</span>
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
                            CERTIFICATE OF MARRIAGE
                        </span>
                    </div>
                    <!-- Province -->
                    <div class="field-label" style="display: flex; height: 40px; border-bottom: 0.2px solid rgb(224, 67, 93); border-top: 0.2px solid rgb(224, 67, 93);  margin-top: 2px;">
                    <div style="padding-left: 4px; display: flex; justify-content:space-evenly;  flex-direction: column; width: 70%; border-right: 0.2px solid rgb(224, 67, 93);">
                        <div style="display: flex; padding-top: 4px;">
                            <span>Province:</span>
                            <span style="font-weight:600px; flex-grow: 1; display:inline-block; height: 1.2em; border-bottom: 0.2px solid rgb(224, 67, 93); height: 1.2em; line-height: 1.2em; text-align: center;">
                                ${params.province || ''}
                            </span>
                        </div>
                        <div style="display: flex;">
                            <span>City/Municipality:</span>
                            <span style="font-weight:600px;  flex-grow: 1; border-bottom: 0.2px solid rgb(224, 67, 93); height: 1.2em; line-height: 1.2em; text-align: center;">
                                ${params.city || ''}
                            </span>
                        </div>
                    </div>
                    <div style="padding-left: 4px; width: 30%; border-left: 0.2px solid rgb(224, 67, 93);">
                        <span>
                        Registry No.
                        </span>
                        <span style="font-weight:600px; display: inline-block; width: 98%;  height: 15px; line-height: 15px; text-align: center;">
                            ${params.registry || ''}
                        </span>
                    </div>
                    </div>

                    <!-- Personal Data -->
                    <div style="width: 100%; border: 1px solid rgb(224, 67, 93); font-family: Arial, sans-serif; font-size: 10px; display: flex; flex-direction: column;">

                    <div style="display: flex; width: 100%; font-weight: bold; text-align: center; border-bottom: 1px solid rgb(224, 67, 93);">
                        <div style="width: 20%; padding: 4px; border-right: 1px solid rgb(224, 67, 93);">&nbsp;</div>
                        <div style="width: 40%; padding: 4px; border-right: 1px solid rgb(224, 67, 93);">HUSBAND</div>
                        <div style="width: 40%; padding: 4px;">WIFE</div>
                    </div>
                
                    <!-- Name of Contracting Parties -->
                    <div style="display: flex; width: 100%; border-bottom: 1px solid rgb(224, 67, 93);">
                        <div style="width: 20%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; flex-direction: column; justify-content: space-around;">
                            <span style="font-weight: bold;">1. Name of Contracting Parties</span>
                        </div>
                
                        <div style="width: 40%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; flex-direction: column; justify-content: space-evenly;">
                            <div style="display: flex;">
                                <span class="field-label-small-text" style="width: 20%;  padding-top: 2px;"> (First) </span>
                                <span style="font-weight: 600px; border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; text-align: center;">
                                    ${params.husband_first_name || ''}
                                </span>
                            </div>
                            <div style="display: flex;">
                                <span class="field-label-small-text" style="width: 20%; padding-top: 2px;"> (Middle) </span>
                                <span style="font-weight: 600px; border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; text-align: center;">
                                    ${params.husband_middle_name || ''}
                                </span>
                            </div>
                            <div style="display: flex;">
                                <span class="field-label-small-text" style="width: 20%; padding-top: 2px;"> (Last) </span>
                                <span style="font-weight: 600px; border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; text-align: center;">
                                    ${params.husband_last_name || ''}
                                </span>
                            </div>
                        </div>
                
                        <div style="width: 40%; padding: 4px; display: flex; flex-direction: column; justify-content: space-evenly;">
                            <div style="display: flex;">
                                <span class="field-label-small-text" style="width: 20%; padding-top: 2px;"> (First) </span>
                                <span style="font-weight: 600px; border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; text-align: center;">
                                    ${params.wife_first_name || ''}
                                </span>
                            </div>
                            <div style="display: flex;">
                                <span class="field-label-small-text" style="width: 20%; padding-top: 2px;"> (Middle) </span>
                                <span style="font-weight: 600px; border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; text-align: center;">
                                    ${params.wife_middle_name || ''}
                                </span>
                            </div>
                            <div style="display: flex;">
                                <span class="field-label-small-text" style="width: 20%; padding-top: 2px;"> (Last) </span>
                                <span style="font-weight: 600px; border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; text-align: center;">
                                    ${params.wife_last_name || ''}
                                </span>
                        </div>
                    </div>
            <!-- Date of Birth and Age -->
                    <div style="display: flex; width: 100%; border-bottom: 1px solid rgb(224, 67, 93); height: 35px;">
                        <div style="width: 20%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; flex-direction: column; justify-content: center;">
                            <span style="font-weight: bold; font-size: 10px;">2a. Date of Birth</span>
                            <span style="font-weight: bold; font-size: 10px;">2b. Age</span>
                        </div>
                
                        <div style=" width: 40%; padding: 0 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; align-items: flex-start; justify-content: space-evenly;">

                            <div style="display: flex; flex-direction: column; align-items: center; width: 10%;">
                                <span class="field-label-small-text" style="padding:2px 0 4px 0;">(Day)</span>  
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                    ${params.husband_birth_date.split('-')[2] || ''}
                                </span>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
                                <span class="field-label-small-text" style="padding:2px 0 4px 0;">(Month)</span>  
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                    ${params.husband_birth_date.split('-')[1] || ''}
                                </span>
                            </div>
                            
                            <div style=" height: 100%; display: flex; flex-direction: column; align-items: center; width: 20%; border-right: 0.2px solid rgb(224, 67, 93); ">
                                <span class="field-label-small-text" style="padding:2px 0 4px 0; ">(Year)</span>  
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                    ${params.husband_birth_date.split('-')[0] || ''}
                                </span>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; align-items: center; width: 10%;">
                                <span class="field-label-small-text" style="padding:2px 0 4px 0;">(Age)</span>  
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                    ${params.husband_age || ''}
                                </span>
                            </div>
                        </div>      
                        <div style=" width: 40%; padding: 0 4px;  display: flex; align-items: flex-start; justify-content: space-evenly;">

                        <div style="display: flex; flex-direction: column; align-items: center; width: 10%;">
                            <span class="field-label-small-text" style="padding:2px 0 4px 0;">(Day)</span>  
                            <span style="font-weight: 600px; width: 100%; text-align: center;">
                                ${params.wife_birth_date.split('-')[2] || ''}
                            </span>
                        </div>
                        
                        <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
                            <span class="field-label-small-text" style="padding:2px 0 4px 0;">(Month)</span>  
                            <span style="font-weight: 600px; width: 100%; text-align: center;">
                                ${params.wife_birth_date.split('-')[1] || ''}
                            </span>
                        </div>
                        
                        <div style=" height: 100%; display: flex; flex-direction: column; align-items: center; width: 20%; border-right: 0.2px solid rgb(224, 67, 93); ">
                            <span class="field-label-small-text" style="padding:2px 0 4px 0; ">(Year)</span>  
                            <span style="font-weight: 600px; width: 100%; text-align: center;">
                                ${params.wife_birth_date.split('-')[0] || ''}
                            </span>
                        </div>
                        
                        <div style="display: flex; flex-direction: column; align-items: center; width: 10%;">
                            <span class="field-label-small-text" style="padding:2px 0 4px 0;">(Age)</span>  
                            <span style="font-weight: 600px; width: 100%; text-align: center;">
                                ${params.wife_age || ''}
                            </span>
                        </div>
                    </div>      
                </div>
            <!-- Place of Birth -->
                    <div style="display: flex; width: 100%; border-bottom: 1px solid rgb(224, 67, 93); height: 35px;">
                        <div style="width: 20%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; align-items: center;">
                            <span style="font-weight: bold;">3. Place of Birth</span>
                        </div>
                
                        <div style="width: 40%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; align-items: flex-start; justify-content: space-around;">
                            <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                <span class="field-label-small-text" style="padding-bottom: 4px;">(City/Municipality)</span>
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                    ${params.husband_birth_city || ''}
                                </span>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                <span class="field-label-small-text" style="padding-bottom: 4px;">(Province)</span>
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                    ${params.husband_birth_province || ''}
                                </span>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; align-items: center; width: 20%;">
                                <span class="field-label-small-text" style="padding-bottom: 4px;">(Country)</span>
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                    ${params.husband_birth_country || ''}
                                </span>
                            </div>
                        </div>      
                        <div style="width: 40%; padding: 4px; display: flex; align-items: flex-start; justify-content: space-around;">
                            <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                <span class="field-label-small-text" style="padding-bottom: 4px;">(City/Municipality)</span>
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                    ${params.wife_birth_city || ''}
                                </span>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                <span class="field-label-small-text" style="padding-bottom: 4px;">(Province)</span>
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                    ${params.wife_birth_province || ''}
                                </span>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; align-items: center; width: 20%;">
                                <span class="field-label-small-text" style="padding-bottom: 4px;">(Country)</span>
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                    ${params.wife_birth_country || ''}
                                </span>
                            </div>
                        </div>      
                        </div>
            <!-- Sex and Citizenship -->
                    <div style="display: flex; width: 100%; border-bottom: 1px solid rgb(224, 67, 93); height: 35px;">
                        <div style="width: 19.4%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; flex-direction: column; justify-content: center;">
                            <span style="font-weight: bold; font-size: 10px;">4a. Sex</span>
                            <span style="font-weight: bold; font-size: 10px;">4b. Citizenship</span>
                        </div>
                
                        <div style="width: 40%; border-right: 1px solid rgb(224, 67, 93); display: flex; justify-content: space-around;">

                            <div style="display: flex; justify-content: center; align-items: center; width: 30%; border-right: 0.2px solid rgb(224, 67, 93);">
                                <span style="text-align: center; height: 1em;">
                                    ${params.husband_sex || ''}
                                </span>
                            </div>
                            <div style="display: flex; align-items: center; width: 70%; flex-direction: column;">
                                <span class="field-label-small-text" style="padding:2px 0 4px 0;">(Citizenship)</span>
                                <span style="font-weight: 600px; text-align: center; height: 1em;">
                                    ${params.husband_citizenship || ''}
                                </span>
                            </div>
                        </div>
                
                        <div style="width: 40%;  display: flex; justify-content: space-around;">

                            <div style="display: flex; justify-content: center; align-items: center; width: 30%; border-right: 0.2px solid rgb(224, 67, 93);">
                                <span style="font-weight: 600px; text-align: center; height: 1em;">
                                    ${params.wife_sex || ''}
                                </span>
                            </div>
                            <div style="display: flex; align-items: center; width: 70%; flex-direction: column;">
                                <span class="field-label-small-text" style="padding:2px 0 4px 0;">(Citizenship)</span>
                                <span style="font-weight:600px; text-align: center; height: 1em;">
                                    ${params.wife_citizenship || ''}
                                </span>
                            </div>
                        </div>
                    </div>
                <!-- Residence -->
                    <div style="display: flex; width: 100%; border-bottom: 1px solid rgb(224, 67, 93); height: 35px;">
                        <div style="width: 20%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; align-items: center;">
                            <span style="font-weight: bold;">5. Residence</span>
                        </div>
                
                        <div style="width: 40%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; align-items: flex-start; justify-content: space-around;">
                            <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
                                <span class="field-label-small-text-2" style="padding-bottom: 4px;">(House No., St., House No., St., Barangay, City/Municipality, Province, Country)</span>
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                ${params.husband_residence_barangay || ''}
                                </span>
                            </div>
                        </div>      
                
                        <div style="width: 40%; padding: 4px;  display: flex; align-items: flex-start; justify-content: space-around;">
                            <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
                                <span class="field-label-small-text-2" style="padding-bottom: 4px;">(House No., St., House No., St., Barangay, City/Municipality, Province, Country)</span>
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                ${params.husband_residence_barangay || ''}
                                </span>
                            </div>
                        </div>      
                    </div>
                    <!-- Religion/ Religious Sect -->
                    <div style="display: flex; width: 100%; border-bottom: 1px solid rgb(224, 67, 93); height: 25px;">
                        <div style="width: 20%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; align-items: center;">
                            <span style="font-weight: bold; font-size: 10px;">6. Religion/ Religious Sect</span>
                        </div>
                
                        <div style="width: 40%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; align-items: flex-end;">
                            <span style="font-weight: 600px; flex-grow: 1; text-align: center;">
                            ${params.husband_religion || ''}
                            </span>
                        </div>
                
                        <div style="width: 40%; padding: 4px; display: flex; align-items: flex-end;">
                            <span style="font-weight: 600px; flex-grow: 1; text-align: center;">
                            ${params.wife_religion || ''}
                            </span>
                        </div>
                    </div>
                    <!-- Civil Status -->
                    <div style="display: flex; width: 100%; border-bottom: 1px solid rgb(224, 67, 93); height: 25px;">
                        <div style="width: 20%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; align-items: center;">
                            <span style="font-weight: bold;">7. Civil Status</span>
                        </div>
                
                        <div style="width: 40%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; align-items: flex-end;">
                            <span style="font-weight: 600px; flex-grow: 1; text-align: center;">
                            ${params.husband_civil_status || ''}
                            </span>
                        </div>
                
                        <div style="width: 40%; padding: 4px; display: flex; align-items: flex-end;">
                            <span style="font-weight: 600px; flex-grow: 1; text-align: center;">
                            ${params.wife_civil_status || ''}
                            </span>
                        </div>
                    </div>
                    <!-- Name of Father -->
                    <div style="display: flex; width: 100%; border-bottom: 1px solid rgb(224, 67, 93);">
                        <div style="width: 20%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; flex-direction: column; justify-content: space-around;">
                            <span style="font-weight: bold;">8. Name of Father</span>
                        </div>
                
                        <div style="width: 40%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; align-items: flex-start; justify-content: space-around;">
                
                            <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                <span class="field-label-small-text" style="padding-bottom: 8px;">(First)</span>
                                <span style="width: 100%; text-align: center;">
                                ${params.husband_father_name_first || ''}
                                </span>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                <span class="field-label-small-text" style="padding-bottom: 8px;">(Middle)</span>
                                <span style="width: 100%; text-align: center;">
                                ${params.husband_father_name_middle || ''}
                                </span>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; align-items: center; width: 20%;">
                                <span class="field-label-small-text" style="padding-bottom: 8px;">(Last)</span>
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                ${params.husband_father_name_last || ''}
                                </span>
                            </div>
                        </div>      
                
                        <div style="width: 40%; padding: 4px; display: flex; align-items: flex-start; justify-content: space-around;">
                
                            <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                <span class="field-label-small-text" style="padding-bottom: 8px;">(First)</span>
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                ${params.wife_father_name_first || ''}
                                </span>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                <span class="field-label-small-text" style="padding-bottom: 8px;">(Middle)</span>
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                ${params.wife_father_name_middle || ''}
                                </span>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; align-items: center; width: 20%;">
                                <span class="field-label-small-text" style="padding-bottom: 8px;">(Last)</span>
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                ${params.wife_father_name_last || ''}
                                </span>
                            </div>
                        </div>      
                    </div>
                    <!-- Citizenship -->
                    <div style="display: flex; width: 100%; border-bottom: 1px solid rgb(224, 67, 93); height: 25px;">
                        <div style="width: 20%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; align-items: center;">
                            <span style="font-weight: bold;">9. Citizenship</span>
                        </div>
                
                        <div style="width: 40%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; align-items: flex-end;">
                            <span style="font-weight: 600px; flex-grow: 1; text-align: center;">
                            ${params.husband_father_citizenship || ''}
                            </span>
                        </div>
                
                        <div style="width: 40%; padding: 4px; display: flex; align-items: flex-end;">
                            <span style="font-weight: 600px; flex-grow: 1; text-align: center;">
                             ${params.wife_father_citizenship || ''}
                            </span>
                        </div>
                    </div>
                
                    <!-- Maiden Name of Mother -->
                    <div style="display: flex; width: 100%; border-bottom: 1px solid rgb(224, 67, 93);">
                        <div style="width: 20%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; flex-direction: column; justify-content: space-around;">
                            <span style="font-weight: bold;">10. Maiden Name of Mother</span>
                        </div>
                
                        <div style="width: 40%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; align-items: flex-start; justify-content: space-around;">
                
                            <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                <span class="field-label-small-text" style="padding-bottom: 8px;">(First)</span>
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                ${params.husband_mother_name_first || ''}
                                </span>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                <span class="field-label-small-text" style="padding-bottom: 8px;">(Middle)</span>
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                ${params.husband_mother_name_middle || ''}
                                </span>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; align-items: center; width: 20%;">
                                <span class="field-label-small-text" style="padding-bottom: 8px;">(Last)</span>
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                ${params.husband_mother_name_last || ''}
                                </span>
                            </div>
                        </div>      
                
                        <div style="width: 40%; padding: 4px; display: flex; align-items: flex-start; justify-content: space-around;">
                
                            <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                <span class="field-label-small-text" style="padding-bottom: 8px;">(First)</span>
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                    ${params.wife_mother_name_first || ''}
                                </span>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                <span class="field-label-small-text" style="padding-bottom: 8px;">(Middle)</span>
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                    ${params.wife_mother_name_middle || ''}
                                </span>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; align-items: center; width: 20%;">
                                <span class="field-label-small-text" style="padding-bottom: 8px;">(Last)</span>
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                    ${params.wife_mother_name_last || ''}
                                </span>
                            </div>
                        </div>  
                    </div>
                    <!-- Citizenship -->
                    <div style="display: flex; width: 100%; border-bottom: 1px solid rgb(224, 67, 93); height: 25px;">
                        <div style="width: 20%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; align-items: center;">
                            <span style="font-weight: bold;">11. Citizenship</span>
                        </div>
                
                        <div style="width: 40%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; align-items: flex-end;">
                            <span style="font-weight: 600px; flex-grow: 1; text-align: center;">
                                ${params.husband_mother_citizenship || ''}
                            </span>
                        </div>
                
                        <div style="width: 40%; padding: 4px; display: flex; align-items: flex-end;">
                            <span style="font-weight: 600px; flex-grow: 1; text-align: center;">
                             ${params.wife_mother_citizenship || ''}
                            </span>
                        </div>
                    </div>
                    <!-- Name of Person/ Wali Who Gave Consent or Advice -->
                    <div style="display: flex; width: 100%; border-bottom: 1px solid rgb(224, 67, 93);">
                        <div style="width: 20%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; flex-direction: column; justify-content: space-around;">
                            <span style="font-weight: bold; font-size: 10px;">12. Name of Person/ Wali Who Gave Consent or Advice</span>
                        </div>
                
                        <div style="width: 40%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; align-items: flex-start; justify-content: space-around;">
                
                            <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                <span class="field-label-small-text" style="padding-bottom: 8px;">(First)</span>
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                    ${params.husband_consent_name_first || ''}
                                </span>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                <span class="field-label-small-text" style="padding-bottom: 8px;">(Middle)</span>
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                    ${params.husband_consent_name_middle || ''}
                                </span>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; align-items: center; width: 20%;">
                                <span class="field-label-small-text" style="padding-bottom: 8px;">(Last)</span>
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                    ${params.husband_consent_name_last || ''}
                                </span>
                            </div>
                        </div>      
                
                        <div style="width: 40%; padding: 4px; display: flex; align-items: flex-start; justify-content: space-around;">
                
                            <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                <span class="field-label-small-text" style="padding-bottom: 8px;">(First)</span>
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                    ${params.wife_consent_name_first || ''}
                                </span>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                <span class="field-label-small-text" style="padding-bottom: 8px;">(Middle)</span>
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                    ${params.wife_consent_name_middle || ''}
                                </span>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; align-items: center; width: 20%;">
                                <span class="field-label-small-text" style="padding-bottom: 8px;">(Last)</span>
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                    ${params.wife_consent_name_last || ''}
                                </span>
                            </div>
                        </div>  
                    </div>
                
                    <!-- Relationship -->
                    <div style="display: flex; width: 100%; border-bottom: 1px solid rgb(224, 67, 93); height: 25px;">
                        <div style="width: 20%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; align-items: center;">
                            <span style="font-weight: bold;">13. Relationship</span>
                        </div>
                
                        <div style="width: 40%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; align-items: flex-end;">
                            <span style="font-weight: 600px; flex-grow: 1; text-align: center;">
                            ${params.husband_relationship || ''}
                            </span>
                        </div>
                
                        <div style="width: 40%; padding: 4px; display: flex; align-items: flex-end;">
                            <span style="font-weight: 600px; flex-grow: 1; text-align: center;">
                            ${params.wife_relationship || ''}
                            </span>
                        </div>
                    </div>
                    
                    <!-- Residence -->
                    <div style="display: flex; width: 100%; height: 35px;">
                        <div style="width: 20%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; align-items: center;">
                            <span style="font-weight: bold;">14. Residence</span>
                        </div>
                
                        <div style="width: 40%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; align-items: flex-start; justify-content: space-around;">
                            <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
                                <span class="field-label-small-text-2" style="padding-bottom: 4px;">(House No., St., House No., St., Barangay, City/Municipality, Province, Country)</span>
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                    ${params.husband_consent_person_barangay || ''}, ${params.husband_consent_person_city || ''}, ${params.husband_consent_person_province || ''}, ${params.husband_consent_person_country || ''}
                                </span>
                            </div>
                        </div>      
                
                        <div style="width: 40%; padding: 4px;  display: flex; align-items: flex-start; justify-content: space-around;">
                            <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
                                <span class="field-label-small-text-2" style="padding-bottom: 4px;">(House No., St., House No., St., Barangay, City/Municipality, Province, Country)</span>
                                <span style="font-weight: 600px;width: 100%; text-align: center;">
                                    ${params.wife_consent_person_barangay || ''}, ${params.wife_consent_person_city || ''}, ${params.wife_consent_person_province || ''}, ${params.wife_consent_person_country || ''}
                                </span>
                            </div>
                        </div>      
                    </div>
                </div>
                <div style=" padding: 5px; font-family: Arial, sans-serif; font-size: 10px; display: flex; flex-direction: column;">
                    <!-- Place of Marriage -->
                    <div style="display: flex; flex-direction: column; padding-bottom: 2px;">
                    <div style="display: flex; align-items: flex-start; width: 100%; margin-bottom: 4px;">
                
                        <span style="white-space: nowrap; margin-right: 5px;">15. Place of Marriage:</span>
                    
                        <div style="display: flex; flex-direction: column; flex-grow: 0.6; text-align: center; ">
                            <span style="font-weight: 600px; border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em;">
                                ${params.place_of_marriage_barangay || ''}
                            </span>
                            <span class="field-label-small-text-2" style="white-space: nowrap; margin-top: 2px;">(Office of the/House of/Barangay of/Church of/Mosque of)</span>
                        </div>
                    
                        <div style="display: flex; flex-direction: column; flex-grow: 0.25; margin-left: 10px; text-align: center;">
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em;">
                                ${params.place_of_marriage_city || ''}
                            </span>
                            <span class="field-label-small-text-2" style="white-space: nowrap; margin-top: 2px;">(City/Municipality)</span>
                        </div>
                    
                        <div style="display: flex; flex-direction: column; flex-grow: 0.25; margin-left: 10px; text-align: center;">
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em;">
                                ${params.place_of_marriage_province || ''}
                            </span>
                            <span class="field-label-small-text-2" style="white-space: nowrap; margin-top: 2px;">(Province)</span>
                        </div>
                    </div>

                    <div style="display: flex; align-items: flex-start; width: 100%;">
                        
                            <div style="display: flex; align-items: flex-start; width: 60%; justify-content: space-between;">
                            <span style=" white-space: nowrap; margin-right: 5px;">16. Date of Marriage:</span>
                            
                            <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
                                <span style="font-weight:600px; border-bottom: 0.2px solid rgb(224, 67, 93); width: 100%; height: 1em; line-height: 1em; text-align: center;">
                                    ${params.date_of_marriage.split('-')[2] || ''}
                                </span>
                                <span class="field-label-small-text-2" style="margin-top: 2px;">(Day)</span>
                            </div>
                        
                            <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
                                <span style="font-weight:600px; border-bottom: 0.2px solid rgb(224, 67, 93); width: 100%; height: 1em; line-height: 1em; text-align: center;">
                                    ${params.date_of_marriage.split('-')[1] || ''}
                                </span>
                                <span class="field-label-small-text-2" style="margin-top: 2px;">(Month)</span>
                            </div>
                        
                            <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
                                <span style="font-weight:600px; border-bottom: 0.2px solid rgb(224, 67, 93); width: 100%; height: 1em; line-height: 1em; text-align: center;">
                                    ${params.date_of_marriage.split('-')[0] || ''}
                                </span>
                                <span class="field-label-small-text-2" style="margin-top: 2px;">(Year)</span>
                            </div>
                        </div>
                                        
                        <div style="display: flex; align-items: flex-start; width: 40%; padding: 0 5px;">
                            <span style="font-weight: bold; white-space: nowrap; margin-right: 5px;">17. Time of Marriage:</span>
                            <div style="display: flex; flex-grow: 1; align-items: center;">
                                <span style="font-weight:600px;  border-bottom: 0.2px solid rgb(224, 67, 93); width: 100%; height: 1em; line-height: 1em; text-align: center;">
                                    ${params.time_of_marriage || ''}
                                </span>
                                <span style="margin-top: 2px; white-space: nowrap; font-size: 10px;">am/pm</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- CERTIFICATION OF THE CONTRACTING PARTIES -->
                    <div style="display: flex; flex-direction: column; padding: 5px 0;">
                        <span style="margin-bottom: 2px;">18. CERTIFICATION OF THE CONTRACTING PARTIES:</span>
                        
                        <div style="display: flex; align-items: flex-end; width: 100%;">
                            <span style="white-space: nowrap; padding-left: 50px;">THIS IS TO CERTIFY: That I </span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 35%; height: 1em; line-height: 1em; margin: 0 5px; text-align: center;">&nbsp;IS TO CERTIFY</span>
                            <span style="white-space: nowrap;"> and I, </span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px; text-align: center;">&nbsp;IS TO CERTIFY</span>
                            <span style="white-space: nowrap;">, both of</span>
                        </div>
                        
                        <div style="width: 100%; margin-top: 5px;">
                            <span>legal age, of our own free will and accord, and in the presence of the person solemnizing this marriage and of the witnesses named below, take each other as</span>
                            <span>husband and wife and certifying further that we: &nbsp </span>
                            <span style="border: 1px solid rgb(224, 67, 93); width: 10px; height: 10px; padding: 0 2px;">&#10003;</span>
                            <span style="white-space: nowrap;"> have entered a copy of which is hereto attached / </span>
                            <span style="border: 1px solid rgb(224, 67, 93); width: 10px; height: 10px; padding: 0 2px;">&#10003;</span>
                            <span style="white-space: nowrap;"> have not entered into a marriage settlement.</span>
                        </div>
                
                        <div style="display: flex; flex-direction: column; width: 100%; margin-top: 5px;">
                            <div style="display: flex; align-items: flex-end; width: 100%;">
                                <span style="white-space: nowrap; padding-left: 50px;">IN WITNESS WHEREOF, we have signed/marked with our fingerprint this certificate in quadruplicate this </span>
                                <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 3%; height: 1em; line-height: 1em; text-align: center;">9</span>
                                <span style="white-space: nowrap;"> day of </span>
                                <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em; text-align: center;">OCTOBER</span>
                                <span style="white-space: nowrap;">.</span>
                                <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em; text-align: center;">2027</span>
                            </div>
                            
                            <div style="display: flex; justify-content: space-evenly; margin-top: 15px;">
                                <div style="width: 45%; text-align: center;">
                                    <div style="border-bottom: 0.2px solid rgb(224, 67, 93); height: 1em; margin-bottom: 5px;">&nbsp;</div>
                                    <span style="font-size: 9px;">(Signature of Husband)</span>
                                </div>
                                <div style="width: 45%; text-align: center;">
                                    <div style="border-bottom: 0.2px solid rgb(224, 67, 93); height: 1em; margin-bottom: 5px;">&nbsp;</div>
                                    <span style="font-size: 9px;">(Signature of Wife)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <!-- CERTIFICATION OF THE SOLEMNIZING OFFICER -->
                    <div style="display: flex; flex-direction: column; padding: 2px 0;">
                        <span style="margin-bottom: 3px;">19. CERTIFICATION OF THE SOLEMNIZING OFFICER:</span>
                        
                        <div style="margin-bottom: 3px;">
                            <span style="padding-left: 50px;">THIS IS TO CERTIFY: That BEFORE ME, on the date and place above-written, personally appeared the above-mentioned parties, with their mutual consent, lawfully joined together in marriage which was solemnized by me in the presence of the witnesses named below, all of legal age.</span>
                        </div>
                
                        <div style="margin-left: 10px;">
                            <span style="display: block; margin-bottom: 1px; padding-left: 50px;">I CERTIFY FURTHER THAT:</span>
                            
                            <div style="display: flex; align-items: center; margin-bottom: 5px;">
                                <span style="border: 1px solid rgb(224, 67, 93); width: 10px; height: 10px; margin-right: 5px;">&nbsp;</span>
                                <span style="white-space: nowrap;">a. Marriage License No. </span>
                                <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 25%; height: 1em; line-height: 1em; margin: 0 5px;">&nbsp; IS TO CERTIFY</span>
                                <span style="white-space: nowrap;"> issued on </span>
                                <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 25%; height: 1em; line-height: 1em; margin: 0 5px;">&nbsp; IS TO CERTIFY</span>
                                <span style="white-space: nowrap;"> at </span>
                                <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em; margin-left: 5px;">&nbsp; IS TO CERTIFY</span>
                            </div>
                
                            <div style="margin-left: 20px;">
                                <span>in favor of said parties, was exhibited to me.</span>
                            </div>
                
                            <div style="display: flex; align-items: center; margin-top: 5px; margin-bottom: 5px;">
                                <span style="border: 1px solid rgb(224, 67, 93); width: 10px; height: 10px; margin-right: 5px;">&nbsp;</span>
                                <span style="white-space: nowrap;">b. no marriage license was necessary, the marriage being solemnized under Art </span>
                                <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 20%; height: 1em; line-height: 1em; margin: 0 5px;">&nbsp;CERTIFY</span>
                                <span style="white-space: nowrap;"> of Executive Order No. 209.</span>
                            </div>
                            
                            <div style="display: flex; align-items: center;">
                                <span style="border: 1px solid rgb(224, 67, 93); width: 10px; height: 10px; margin-right: 5px;">&nbsp;</span>
                                <span style="white-space: nowrap;">c. the marriage was solemnized in accordance with the provisions of Presidential Decree No. 1083.</span>
                            </div>
                        </div>
                        
                        <div style="width: 100%; margin-top: 20px; font-size: 9px; overflow-x: auto;">
                        <div style="display: flex; align-items: flex-start; white-space: wrap;">
                            
                            <div style="display: flex; flex-direction: column; text-align: center; margin-right: 15px; width: 200px;">
                                <div style="border-bottom: 0.2px solid rgb(224, 67, 93); height: 1.2em; margin-bottom: 2px;">SAMPLE SIGNATURE</div>
                                <span style="display: block; font-size: 8px;">(Signature Over Printed Name of Solemnizing Officer)</span>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; text-align: center; margin-right: 15px; width: 150px;">
                                <div style="border-bottom: 0.2px solid rgb(224, 67, 93); height: 1.2em; margin-bottom: 2px;">PRIEST</div>
                                <span style="display: block; font-size: 8px;">(Position/Designation)</span>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; text-align: center; margin-right: 15px; width: 200px;">
                                <div style="border-bottom: 0.2px solid rgb(224, 67, 93); height: 1.2em; margin-bottom: 2px;">REV. FR. M. PEREZ</div>
                                <span style="display: block; font-size: 8px;">(Printed Name)</span>
                            </div>
                    
                            <div style="display: flex; flex-direction: column; text-align: center; width: 300px;">
                                <div style="border-bottom: 0.2px solid rgb(224, 67, 93); height: 1.2em; margin-bottom: 2px;">ROMAN CATHOLIC REG. NO. 12345</div>
                                <span style="display: block; font-size: 8px;">(Religion/Religious Sect. Registry No. and Expiration Date, if applicable)</span>
                            </div>
                        </div>
                    </div>
                    </div>
                
                    <!-- WITNESSES -->
                    <div style="display: flex; flex-direction: column; padding:  0;">
                        <span>20a. WITNESSES (Print Name and Sign):</span>
                        <span style=" margin-bottom: 8px; margin-left: 5px;">Additional at the back</span>
                        
                        <div style="display: flex; justify-content: space-evenly; margin-top: 5px;">
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 23%; height: 1.2em; text-align: center;">&nbsp;WITNESSES</span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 23%; height: 1.2em; text-align: center;">&nbsp;WITNESSES</span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 23%; height: 1.2em; text-align: center;">&nbsp;WITNESSES</span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 23%; height: 1.2em; text-align: center;">&nbsp;WITNESSES</span>
                        </div>
                    </div>
                </div>


                <!-- RECEIVED BY -->        
                <div style="display: flex; flex-direction: column; width: 100%; font-family: Arial, sans-serif; font-size: 10px;">
                    <div style="display: flex; height: 92px; border-top: 0.2px solid rgb(224, 67, 93); border-bottom: 0.2px solid rgb(224, 67, 93);">
                
                        <div style="width: 50%; padding: 4px; border-right: 0.2px solid rgb(224, 67, 93); display: flex; flex-direction: column;">
                            
                            <span style="margin-bottom: 8px;">21. RECEIVED BY</span>
                
                            <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                                <span>Signature</span>
                                <span style="flex-grow: 1; border-bottom: 0.2px solid rgb(224, 67, 93); height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                    <span style="font-style: italic;">(Signed)</span>
                                </span>
                            </div>
                            
                            <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                                <span>Name in Print</span>
                                <span style="flex-grow: 1; border-bottom: 0.2px solid rgb(224, 67, 93); height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                    JOSE R. REYES
                                </span>
                            </div>
                
                            <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                                <span>Title or Position</span>
                                <span style="flex-grow: 1; border-bottom: 0.2px solid rgb(224, 67, 93); height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                    Clerk
                                </span>
                            </div>
                
                            <div style="display: flex; align-items: flex-end;">
                                <span>Date</span>
                                <span style="flex-grow: 1; border-bottom: 0.2px solid rgb(224, 67, 93); height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                    2025-01-16
                                </span>
                            </div>
                        </div>
                
                        <div style="width: 50%; padding: 4px; display: flex; flex-direction: column;">
                            
                            <span style="margin-bottom: 8px;">22. REGISTERED BY THE CIVIL REGISTRAR</span>
                
                            <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                                <span>Signature</span>
                                <span style="flex-grow: 1; border-bottom: 0.2px solid rgb(224, 67, 93); height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                    <span style="font-style: italic;">(Signed)</span>
                                </span>
                            </div>
                            
                            <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                                <span>Name in Print</span>
                                <span style="flex-grow: 1; border-bottom: 0.2px solid rgb(224, 67, 93); height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                    ALEX M. GOMEZ
                                </span>
                            </div>
                
                            <div style="display: flex; align-items: flex-end; margin-bottom: 5px;">
                                <span>Title or Position</span>
                                <span style="flex-grow: 1; border-bottom: 0.2px solid rgb(224, 67, 93); height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                    City Civil Registrar
                                </span>
                            </div>
                
                            <div style="display: flex; align-items: flex-end;">
                                <span>Date</span>
                                <span style="flex-grow: 1; border-bottom: 0.2px solid rgb(224, 67, 93); height: 1.2em; line-height: 1.2em; text-align: center; margin-left: 5px;">
                                    2025-01-20
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            <!-- REMARKS/ANNOTATIONS (For LCRO/OCRG Use Only) -->
                <div style="padding:0 4px; display: flex; height: 88px;width: 100%; border-top: 0.2px solid rgb(224, 67, 93); border-bottom: 0.2px solid rgb(224, 67, 93); font-size: 10px; flex-direction: column;">
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
                            <span style="font-size: 10px; text-align: center;">4bH</span>
                            <div style="display: flex;">
                                <span style="width: 15px; height: 25px; border: 0.2px solid rgb(224, 67, 93); border-right: none;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid rgb(224, 67, 93);">&nbsp;</span>
                            </div>
                        </div>

                        <div style="display: flex; flex-direction: column; margin-right: 2px;">
                            <span style="font-size: 10px; text-align: center;">4bW</span>
                            <div style="display: flex;">
                                <span style="width: 15px; height: 25px; border: 0.2px solid rgb(224, 67, 93); border-right: none;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid rgb(224, 67, 93);">&nbsp;</span>
                            </div>
                        </div>
                        
                        <div style="display: flex; flex-direction: column; margin-right: 2px;">
                            <span style="font-size: 10px; text-align: center;">5H</span>
                            <div style="display: flex;">
                                <span style="width: 15px; height: 25px; border: 0.2px solid rgb(224, 67, 93); border-right: none;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid rgb(224, 67, 93);">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid rgb(224, 67, 93);">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid rgb(224, 67, 93);">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid rgb(224, 67, 93);">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid rgb(224, 67, 93);">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid rgb(224, 67, 93);">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid rgb(224, 67, 93);">&nbsp;</span>
                            </div>
                        </div>
                        
                        <div style="display: flex; flex-direction: column; margin-right: 2px;">
                            <span style="font-size: 10px; text-align: center;">5W</span>
                            <div style="display: flex;">
                                <span style="width: 15px; height: 25px; border: 0.2px solid rgb(224, 67, 93); border-right: none;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid rgb(224, 67, 93);">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid rgb(224, 67, 93);">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid rgb(224, 67, 93);">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid rgb(224, 67, 93);">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid rgb(224, 67, 93);">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid rgb(224, 67, 93);">&nbsp;</span>
                            </div>
                        </div>
                        
                        <div style="display: flex; flex-direction: column; margin-right: 2px;">
                            <span style="font-size: 10px; text-align: center;">6H</span>
                            <div style="display: flex;">
                                <span style="width: 15px; height: 25px; border: 0.2px solid rgb(224, 67, 93); border-right: none;">&nbsp;</span>
                                <span style="width: 15px; height: 25px; border: 0.2px solid rgb(224, 67, 93);">&nbsp;</span>
                            </div>
                        </div>

                        <div style="display: flex; flex-direction: column; margin-right: 2px;">
                            <span style="font-size: 10px; text-align: center;">6W</span>
                            <div style="display: flex;">
                            <span style="width: 15px; height: 25px; border: 0.2px solid rgb(224, 67, 93);">&nbsp;</span>
                            <span style="width: 15px; height: 25px; border: 0.2px solid rgb(224, 67, 93);">&nbsp;</span>
                            </div>
                        </div>

                        <div style="display: flex; flex-direction: column; margin-right: 2px;">
                            <span style="font-size: 10px; text-align: center;">7H</span>
                            <div style="display: flex;">
                                <span style="width: 15px; height: 25px; border: 0.2px solid rgb(224, 67, 93);">&nbsp;</span>
                            </div>
                        </div>

                        <div style="display: flex; flex-direction: column; margin-right: 2px;">
                            <span style="font-size: 10px; text-align: center;">7W</span>
                            <div style="display: flex;">
                                <span style="width: 15px; height: 25px; border: 0.2px solid rgb(224, 67, 93);">&nbsp;</span>
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
                    <!-- WITNESSES (Print Name and Sign) -->
                    <div style=" padding:2px 5px; border-bottom: 0.2px solid rgb(224, 67, 93); border-bottom: 0.2px solid rgb(224, 67, 93); font-family:  Arial, sans-serif; font-size: 10px; display: flex; flex-direction: column;">
                    <div style="display: flex; flex-direction: column; padding:  0;">
                    <span>20b. WITNESSES (Print Name and Sign):</span>
                    
                    <div style="display: flex; justify-content: space-evenly; margin-top: 10px; ">
                        <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 23%; height: 1.2em; text-align: center;">&nbsp;WITNESSES</span>
                        <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 23%; height: 1.2em; text-align: center;">&nbsp;WITNESSES</span>
                        <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 23%; height: 1.2em; text-align: center;">&nbsp;WITNESSES</span>
                        <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 23%; height: 1.2em; text-align: center;">&nbsp;WITNESSES</span>
                    </div>
                    <div style="display: flex; justify-content: space-evenly; margin-top: 20px;">
                        <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 23%; height: 1.2em; text-align: center;">&nbsp;WITNESSES</span>
                        <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 23%; height: 1.2em; text-align: center;">&nbsp;WITNESSES</span>
                        <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 23%; height: 1.2em; text-align: center;">&nbsp;WITNESSES</span>
                        <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 23%; height: 1.2em; text-align: center;">&nbsp;WITNESSES</span>
                    </div>

                    </div>
                </div>

                    <!-- Affidavit of Solemnizing Officer -->
                    <div style="border-bottom: 2px solid rgb(224, 67, 93); padding: 5px; font-family: Arial, sans-serif; font-size: 10px; display: flex; flex-direction: column;">

                    <div style="text-align: center; margin-bottom: 8px;">
                        <span style="font-weight: bold; font-size: 14px; display: inline-block; padding-bottom: 2px;">AFFIDAVIT OF SOLEMNIZING OFFICER</span>
                    </div>
                
                    <div style="display: flex; flex-direction: column; width: 100%; margin-bottom: 10px; line-height: 1.5;">
                        
                        <div style="display: flex; align-items: flex-end; width: 100%;">
                            <span style="white-space: nowrap; padding-left: 50px;">I, </span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 25%; height: 1em; line-height: 1em; text-align: center; margin-right: 5px;">REV. FR. MARK PEREZ</span>
                            <span style="white-space: nowrap;">, of legal age, Solemnizing Officer of </span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em; text-align: center; margin-left: 5px;">ST. MICHAEL THE ARCHANGEL PARISH</span>
                            <span style="white-space: nowrap; margin-left: 5px;"> with address at</span>
                        </div>
                        
                        <div style="display: flex; align-items: flex-end; width: 100%; margin-top: 5px;">
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 55%; height: 1em; line-height: 1em; text-align: center;">SOGOD, LEYTE</span>
                            <span style="white-space: nowrap; margin-left: 5px;"> after having been duly sworn in accordance with law, do hereby depose and say:</span>
                        </div>
                    </div>
                
                    <div style="display: flex; flex-direction: column; width: 100%;">
                        
                        <div style="margin-bottom: 4px;">
                            <span style="white-space: nowrap;">1. That I have solemnized the marriage between </span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 30%; height: 1em; line-height: 1em; text-align: center; display: inline-block;">HUSBAND'S NAME</span>
                            <span style="white-space: nowrap; margin: 0 5px;"> and </span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 30%; height: 1em; line-height: 1em; text-align: center; display: inline-block;">WIFE'S NAME</span>
                            <span style="white-space: nowrap;">;</span>
                        </div>
                
                        <div style="margin-bottom: 4px;">
                            <div style="display: flex; align-items: flex-start; margin-bottom: 5px;">
                                <span style="white-space: nowrap; ">2.</span>  
                                <span style=" margin-left: 2px; border: 1px solid rgb(224, 67, 93); width: 10px; height: 10px; margin-right: 5px; margin-top: 2px;">&#10003;</span>
                                <span style="display: inline;">a. That I have ascertained the qualifications of the contracting parties and have found no legal impediment for them to marry as required by Article 34 of the Family Code;</span>
                            </div>

                            <div style="margin-left: 10px; line-height: 1.6;">
                                <div style="display: flex; align-items: flex-start; margin-bottom: 5px;">
                                    <span style="border: 1px solid rgb(224, 67, 93); width: 10px; height: 10px; margin-right: 5px; margin-top: 2px;">&nbsp;</span>
                                    <span style="display: inline;">b. That this marriage was performed in **articulo mortis** or at the point of death;</span>
                                </div>
                                
                                <div style="display: flex; flex-direction: column; margin-bottom: 5px;">
                                    <div style="display: flex; align-items: flex-start;">
                                        <span style="border: 1px solid rgb(224, 67, 93); width: 10px; height: 10px; margin-right: 5px; margin-top: 2px;">&nbsp;</span>
                                        <span style="display: inline;">c. That the contracting party/ies </span>
                                        <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em; text-align: center; margin: 0 5px;">&nbsp; EXAMPLES</span>
                                        <span style="white-space: nowrap;"> and </span>
                                        <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em; text-align: center; margin-left: 5px;">&nbsp; EXAMPLES</span>
                                        <span style="white-space: nowrap; margin-left: 5px;">, being at the point of</span>
                                    </div>
                                    <div style="margin-left: 15px; margin-top: 2px;">
                                        <span>death and physically unable to sign the foregoing certificate of marriage by signature or mark, one of the witnesses to the marriage; sign for him or her by writing the dying party’s name and beneath it, the witness’ own signature preceded by the preposition “By”;</span>
                                    </div>
                                </div>
                                
                                <div style="display: flex; align-items: flex-start; margin-bottom: 5px;">
                                    <span style="border: 1px solid rgb(224, 67, 93); width: 10px; height: 10px; margin-right: 5px; margin-top: 2px;">&nbsp;</span>
                                    <span style="display: inline;">d. That the residence of either party is so located that there is no means of transportation to enable concerned party/parties to appear personally before the civil registrar;</span>
                                </div>
                                
                                <div style="display: flex; align-items: flex-start;">
                                    <span style="border: 1px solid rgb(224, 67, 93); width: 10px; height: 10px; margin-right: 5px; margin-top: 2px;">&nbsp;</span>
                                    <span style="display: inline;">e. That the marriage was among Muslims or among members of the Ethnic Cultural Communities and that the marriage was solemnized in accordance with their customs and practices;</span>
                                </div>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 8px;">
                            <span style="white-space: normal;">3. That I took the necessary steps to ascertain the ages and relationship of the contracting parties and that neither of them are under any legal impediment to marry each other;</span>
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <span style="white-space: normal; ">4. That I am executing this affidavit to attest to the truthfulness of the foregoing statements for all legal intents and purposes.</span>
                        </div>
                    </div>
                
                    <div style="display: flex; flex-direction: column; width: 100%; margin-bottom: 4px;">
                        
                        <div style="display: flex; align-items: flex-end; width: 100%; padding-bottom: 4px;">
                            <span style="white-space: nowrap; padding-left: 50px;">In truth whereof, I have affixed my signature below this </span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 8%; height: 1em; line-height: 1em; text-align: center; margin: 0 5px;">18th</span>
                            <span style="white-space: nowrap;"> day of </span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 25%; height: 1em; line-height: 1em; text-align: center; margin-left: 5px;">OCTOBER</span>
                            <span style="white-space: nowrap;">, </span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 15%; height: 1em; line-height: 1em; text-align: center; margin-left: 5px;">2025</span>
                            <span style="white-space: nowrap; margin: 0 5px;"> at </span>
                        </div>
                        <div style="display: flex; align-items: flex-end; width: 100%;">
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 50%; height: 1em; line-height: 1em; text-align: center;">SOGOD, LEYTE</span>
                            <span style="white-space: nowrap; margin-left: 5px;">, Philippines.</span>
                        </div>

                        
                        <div style="display: flex; justify-content: flex-end; width: 100%; margin-top: 15px;">
                            <div style="width: 45%; text-align: center;">
                                <div style="border-bottom: 0.2px solid rgb(224, 67, 93); height: 1em; margin-bottom: 5px;">&nbsp;</div>
                                <span style="font-size: 10px;">Signature Over Printed Name of the Solemnizing Officer</span>
                            </div>
                        </div>
                    </div>
                
                    <div style="display: flex; flex-direction: column; width: 100%; margin-top: 10px; font-size: 10px;">
                        
                        <div style="display: flex; align-items: flex-end; width: 100%;">
                            <span style=" white-space: nowrap; padding-left: 50px;">SUBSCRIBED AND SWORN</span>
                            <span style="white-space: nowrap;"> to before me this </span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1.2em; text-align: center; margin: 0 5px;">18th</span>
                            <span style="white-space: nowrap;"> day of </span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1.2em; text-align: center; margin-left: 5px;">OCTOBER</span>
                            <span style="white-space: nowrap;">, </span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1.2em; text-align: center; margin-left: 5px;">2025</span>
                            <span style="white-space: nowrap; margin-left: 5px;">at</span>
                        </div>
                        
                        <div style="display: flex; align-items: flex-end; width: 100%; margin-top: 4px;">
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1.2em; text-align: center; margin-left: 5px;">2025</span>
                            <span style="white-space: nowrap; margin-left: 5px;">, Philippines, affiant who exhibited to me his Community Tax Cert.</span>
                        </div>
                        <div style="display: flex; align-items: flex-end; width: 100%; margin-top: 4px;">
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 25%; height: 1.2em; text-align: center; margin-left: 5px;">01-05-2025</span>
                            <span style="white-space: nowrap;">issued on </span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 25%; height: 1em; line-height: 1em; text-align: center; margin-left: 5px;">01-05-2025</span>
                            <span style="white-space: nowrap; margin-left: 5px;">at</span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em; text-align: center; margin-left: 5px;">SOGOD, LEYTE</span>
                        </div>
                    </div>
                
                    <div style="display: flex; justify-content: space-evenly; width: 100%; margin-top: 20px;  font-size: 10px;">
                        
                        <div style="width: 40%; display: flex; flex-direction: column; text-align: center;">
                            <div style="border-bottom: 0.2px solid rgb(224, 67, 93); height: 1em; line-height: 1em; margin-bottom: 5px;"></div>
                            <span style="display: block; margin-bottom: 10px;">Signature of the Administering Officer</span>
                            
                            <div style="border-bottom: 0.2px solid rgb(224, 67, 93); height: 1em; line-height: 1em; margin-bottom: 5px;">JUAN B. DELA CRUZ</div>
                            <span>Name in Print</span>
                        </div>
                
                        <div style="width: 40%; display: flex; flex-direction: column; text-align: center;">
                            <div style="border-bottom: 0.2px solid rgb(224, 67, 93); height: 1em; line-height: 1em; margin-bottom: 5px;">CIVIL REGISTRAR</div>
                            <span style="display: block; margin-bottom: 10px;">Position/Title/Designation</span>
                            
                            <div style="border-bottom: 0.2px solid rgb(224, 67, 93); height: 1em; line-height: 1em; margin-bottom: 5px;">SOGOD MUNICIPAL HALL</div>
                            <span>Address</span>
                        </div>
                    </div>
                </div>
                <!-- Affidavit for Delayed Registration of Marriage -->
                <div style="padding: 4px 5px; font-family: Arial, sans-serif; font-size: 10px; display: flex; flex-direction: column;">

                    <div style="text-align: center; margin-bottom: 8px;">
                        <span style="font-weight: bold; font-size: 14px; display: inline-block; padding-bottom: 2px;">AFFIDAVIT FOR DELAYED REGISTRATION OF MARRIAGE</span>
                    </div>
                
                    <div style="display: flex; flex-direction: column; width: 100%; margin-bottom: 8px; line-height: 1.5;">
                        
                        <div style="display: flex; align-items: flex-end; width: 100%;">
                            <span style="white-space: nowrap; padding-left: 50px;">I, </span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 45%; height: 1em; line-height: 1em; text-align: center; margin-right: 5px;">JUAN DELA CRUZ</span>
                            <span style="white-space: nowrap;">, of legal age, single/married/divorced/widow/widower, with residence and</span>
                        </div>
                        
                        <div style="display: flex; align-items: flex-end; width: 100%; margin-top: 2px;">
                            <span style="white-space: nowrap;">postal address </span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em; text-align: center; margin-right: 5px;">SOGOD, LEYTE</span>
                        </div>
                        <div style="display: flex; align-items: flex-end; width: 100%; margin-top: 2px;">
                        <span style="white-space: nowrap;"> after having duly sworn in accordance with law do hereby depose and say:</span>
                        </div>
                    </div>
                
                    <div style="display: flex; flex-direction: column; width: 100%;">
                        
                        <div style="margin-bottom: 8px;">
                            <span style="display: block; margin-bottom: 4px;">1. That I am the applicant for the delayed registration of</span>
                            <div style="margin-left: 10px; line-height: 1.6;">
                                
                                <div style="display: flex; flex-direction: column; margin-bottom: 2px;">
                                <div style="display: flex; align-items: flex-start;">
                                    <span style="border: 1px solid rgb(224, 67, 93); width: 10px; height: 10px; margin-right: 5px; margin-top: 2px;">&#10003;</span>
                                    <span style="white-space: nowrap; margin-right: 5px;"> my marriage with </span>
                                    <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em; text-align: center; margin-right: 5px;">MARIA SANTOS</span>
                                    <span style="white-space: nowrap; margin-right: 5px;"> in </span>
                                    <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em; text-align: center; margin-right: 5px;">SOGOD, LEYTE</span>
                                    <span style="white-space: nowrap; margin-right: 5px;"> on </span>
                                    <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em; text-align: center;">10-18-2010</span>
                                </div>
                                </div>                    
                                <div style="display: flex; flex-direction: column;">
                                <div style="display: flex; align-items: flex-start;">
                                    <span style="border: 1px solid rgb(224, 67, 93); width: 10px; height: 10px; margin-right: 5px; margin-top: 2px;">&nbsp;</span>
                                    <span style="white-space: nowrap; margin-right: 5px;"> the marriage between </span>
                                    <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em; text-align: center; margin-right: 5px;">&nbsp;</span>
                                    <span style="white-space: nowrap; margin-right: 5px;"> and </span>
                                    <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em; text-align: center; margin-right: 5px;">&nbsp;</span>
                                    <span style="white-space: nowrap; margin-right: 5px;"> in </span>
                                </div>
                                <div style="display: flex; align-items: flex-start;">
                                    <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em; text-align: center;"></span>
                                    <span style="white-space: nowrap; margin-right: 5px; padding: 0 4px;"> on </span>
                                    <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em; text-align: center;">10-18-2010</span>
                                </div>
                                </div>

                            </div>
                        </div>
                
                        <div style="margin-bottom: 8px;">
                
                        <div style="display: flex; align-items: flex-end; width: 100%; margin-bottom: 5px;">
                            <span style=" white-space: nowrap; margin-right: 5px;">2. That said marriage was solemnized by</span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em; text-align: center; margin-right: 5px;">REV. FR. MARK PEREZ</span>
                            <span style="white-space: nowrap;">(Solemnizing Officer's name) under</span>
                        </div>
                        
                        <div style="margin-top: 5px; display: flex; justify-content: space-evenly; width: 80%;">
                            <div style="display: flex; align-items: center;"><span style="border: 1px solid rgb(224, 67, 93); width: 10px; height: 10px; margin-right: 5px;">&#10003;</span> a. religious ceremony</div>
                            <div style="display: flex; align-items: center;"><span style="border: 1px solid rgb(224, 67, 93); width: 10px; height: 10px; margin-right: 5px;">&nbsp;</span> b. civil ceremony</div>
                            <div style="display: flex; align-items: center;"><span style="border: 1px solid rgb(224, 67, 93); width: 10px; height: 10px; margin-right: 5px;">&nbsp;</span> c. Muslim rites</div>
                            <div style="display: flex; align-items: center;"><span style="border: 1px solid rgb(224, 67, 93); width: 10px; height: 10px; margin-right: 5px;">&nbsp;</span> d. tribal rites</div>
                        </div>
                    </div>            
                        <div style="margin-bottom: 8px;">
                            <span style="display: block; margin-bottom: 5px;">3. That the marriage was solemnized:</span>
                            
                            <div style="margin-left: 10px; line-height: 1.6;">
                                
                                <div style="display: flex; align-items: flex-start; margin-bottom: 5px;">
                                    <span style="border: 1px solid rgb(224, 67, 93); width: 10px; height: 10px; margin-right: 5px; margin-top: 2px;">&#10003;</span>
                                    <span style="white-space: nowrap; margin-right: 5px;"> a. with marriage license no. </span>
                                    <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 15%; height: 1em; line-height: 1em; text-align: center; margin-right: 5px;">1234567</span>
                                    <span style="white-space: nowrap; margin-right: 5px;"> issued on </span>
                                    <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 15%; height: 1em; line-height: 1em; text-align: center; margin-right: 5px;">10-01-2010</span>
                                    <span style="white-space: nowrap; margin-right: 5px;"> at </span>
                                    <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em; text-align: center;">SOGOD</span>
                                </div>
                                
                                <div style="display: flex; align-items: flex-start;">
                                    <span style="border: 1px solid rgb(224, 67, 93); width: 10px; height: 10px; margin-right: 5px; margin-top: 2px;">&nbsp;</span>
                                    <span style="white-space: nowrap; margin-right: 5px;"> b. under Article </span>
                                    <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 10%; height: 1em; line-height: 1em; text-align: center; margin-right: 5px;">&nbsp;</span>
                                    <span style="white-space: nowrap; margin-right: 5px;"> (marriages of exceptional character);</span>
                                </div>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 8px; font-size: 10px; width: 100%;">
                
                        <div style="display: flex; align-items: flex-end; line-height: 1.5; white-space: nowrap;">
                            <span style=" margin-right: 5px;">4. (If the applicant is either the wife or husband) That I am a citizen of </span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em; text-align: center; display: inline-block; margin-right: 5px;">FILIPINO</span>
                            <span style="margin-right: 5px;"> and my spouse is a citizen of</span>
                        </div>
                        <div style="display: flex; align-items: flex-end; margin-top: 4px; margin-left: 15px; line-height: 1.5;">
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 50%; height: 1em; line-height: 1em; text-align: center; display: inline-block;">FILIPINO</span>
                        </div>
                        
                        <div style="display: flex; align-items: flex-end; margin-top: 4px; margin-left: 15px; line-height: 1.5;">
                            <span style="white-space: nowrap;">(If the applicant is other than the wife or husband) That the wife is a citizen of </span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em; text-align: center; display: inline-block; margin-right: 5px;">&nbsp;</span>
                            <span style="white-space: nowrap;"> and the husband is a citizen of </span>
                        </div>
                        <div style="display: flex; align-items: flex-end; margin-top: 4px; margin-left: 15px; line-height: 1.5;">
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 50%; height: 1em; line-height: 1em; text-align: center; display: inline-block; margin-left: 5px;">&nbsp;</span>
                        </div>

                    </div>
                    <div style="margin-bottom: 15px; font-size: 10px; width: 100%;">
                        <div style="display: flex; align-items: flex-end; width: 100%; line-height: 1.5; white-space: nowrap;">
                            <span style="margin-right: 5px;">5. That the reason for the delay in registering our/their marriage is</span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em; text-align: center; display: inline-block;">LOST MARRIAGE CERTIFICATE COPY</span>
                        </div>
                    </div>    

                        <div style="margin-bottom: 8px;">
                            <span style="white-space: normal;">6. That I am executing this affidavit to attest to the truthfulness of the foregoing statements for all legal intents and purposes.</span>
                        </div>
                    </div>
                
                    <div style="display: flex; flex-direction: column; width: 100%; margin-bottom: 4px;">
                        
                    <div style="display: flex; align-items: flex-end; width: 100%; padding-bottom: 4px;">
                        <span style="white-space: nowrap; padding-left: 50px;">In truth whereof, I have affixed my signature below this </span>
                        <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 8%; height: 1em; line-height: 1em; text-align: center; margin: 0 5px;">18th</span>
                        <span style="white-space: nowrap;"> day of </span>
                        <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 25%; height: 1em; line-height: 1em; text-align: center; margin-left: 5px;">OCTOBER</span>
                        <span style="white-space: nowrap;">, </span>
                        <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 15%; height: 1em; line-height: 1em; text-align: center; margin-left: 5px;">2025</span>
                        <span style="white-space: nowrap; margin: 0 5px;"> at </span>
                    </div>
                    <div style="display: flex; align-items: flex-end; width: 100%;">
                        <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 50%; height: 1em; line-height: 1em; text-align: center;">SOGOD, LEYTE</span>
                        <span style="white-space: nowrap; margin-left: 5px;">, Philippines.</span>
                    </div>

                    
                    <div style="display: flex; justify-content: flex-end; width: 100%; margin-top: 20px;">
                        <div style="width: 45%; text-align: center;">
                            <div style="border-bottom: 0.2px solid rgb(224, 67, 93); height: 1em; margin-bottom: 5px;">&nbsp;</div>
                            <span style="font-size: 10px;">Signature Over Printed Name of the Solemnizing Officer</span>
                        </div>
                    </div>
                </div>

                <div style="display: flex; flex-direction: column; width: 100%; margin-top: 20px; font-size: 10px;">
                            
                        <div style="display: flex; align-items: flex-end; width: 100%;">
                            <span style=" white-space: nowrap; padding-left: 50px;">SUBSCRIBED AND SWORN</span>
                            <span style="white-space: nowrap;"> to before me this </span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1.2em; text-align: center; margin: 0 5px;">18th</span>
                            <span style="white-space: nowrap;"> day of </span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1.2em; text-align: center; margin-left: 5px;">OCTOBER</span>
                            <span style="white-space: nowrap;">, </span>
                            <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1.2em; text-align: center; margin-left: 5px;">2025</span>
                            <span style="white-space: nowrap; margin-left: 5px;">at</span>
                        </div>
                        
                        <div style="display: flex; align-items: flex-end; width: 100%; margin-top: 4px;">
                        <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1.2em; text-align: center; margin-left: 5px;">2025</span>
                        <span style="white-space: nowrap; margin-left: 5px;">, Philippines, affiant who exhibited to me his Community Tax Cert.</span>
                        </div>
                        <div style="display: flex; align-items: flex-end; width: 100%; margin-top: 4px;">
                        <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 25%; height: 1.2em; text-align: center; margin-left: 5px;">01-05-2025</span>
                        <span style="white-space: nowrap;">issued on </span>
                        <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 25%; height: 1em; line-height: 1em; text-align: center; margin-left: 5px;">01-05-2025</span>
                        <span style="white-space: nowrap; margin-left: 5px;">at</span>
                        <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em; text-align: center; margin-left: 5px;">SOGOD, LEYTE</span>
                    </div>
                </div>

                    <div style="display: flex; justify-content: space-evenly; width: 100%; margin-top: 30px;  font-size: 10px;">
                        <div style="width: 40%; display: flex; flex-direction: column; text-align: center;">
                            <div style="border-bottom: 0.2px solid rgb(224, 67, 93); height: 1em; line-height: 1em; margin-bottom: 5px;"></div>
                            <span style="display: block; margin-bottom: 10px;">Signature of the Administering Officer</span>
                            
                            <div style="border-bottom: 0.2px solid rgb(224, 67, 93); height: 1em; line-height: 1em; margin-bottom: 5px;">JUAN B. DELA CRUZ</div>
                            <span>Name in Print</span>
                        </div>

                        <div style="width: 40%; display: flex; flex-direction: column; text-align: center;">
                            <div style="border-bottom: 0.2px solid rgb(224, 67, 93); height: 1em; line-height: 1em; margin-bottom: 5px;">CIVIL REGISTRAR</div>
                            <span style="display: block; margin-bottom: 10px;">Position/Title/Designation</span>
                            
                            <div style="border-bottom: 0.2px solid rgb(224, 67, 93); height: 1em; line-height: 1em; margin-bottom: 5px;">SOGOD MUNICIPAL HALL</div>
                            <span>Address</span>
                        </div>
                    </div>
                    </div>
                    <!-- end of page 2 -->
                </div>
                </div>
            </div>
            </body>
        </html>
    `
}
module.exports = (
    birthGenerateHTML,
    deathGenerateHTML,
    marriageGenerateHTML
);