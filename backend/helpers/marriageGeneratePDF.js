function generate(params) {
    return (
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
                                        ${params.province}
                                    </span>
                                </div>
                                <div style="display: flex;">
                                <span>City/Municipality:</span>
                                    <span style="font-weight:600px; flex-grow: 1; border-bottom: 0.2px solid rgb(224, 67, 93); height: 1.2em; line-height: 1.2em; text-align: center;">
                                        ${params.city}
                                    </span>
                                </div>
                            </div>
                            <div style="padding-left: 4px; width: 30%; border-left: 0.2px solid rgb(224, 67, 93);">
                                <span>
                                Registry No.
                                </span>
                                <span style="font-weight:600px; display: inline-block; width: 98%;  height: 15px; line-height: 15px; text-align: center;">
                                    ${params.registry}
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
                                    <span style="font-weight:600px; border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; text-align: center;">
                                        ${params.husband_first_name}
                                    </span>
                                </div>
                                <div style="display: flex;">
                                    <span class="field-label-small-text" style="width: 20%; padding-top: 2px;"> (Middle) </span>
                                    <span style="font-weight: 600px; border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; text-align: center;">
                                        ${params.husband_middle_name}
                                    </span>
                                </div>
                                <div style="display: flex;">
                                    <span class="field-label-small-text" style="width: 20%; padding-top: 2px;"> (Last) </span>
                                    <span style="font-weight: 600px; border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; text-align: center;">
                                        ${params.husband_last_name}
                                    </span>
                                </div>
                            </div>
                    
                            <div style="width: 40%; padding: 4px; display: flex; flex-direction: column; justify-content: space-evenly;">
                                <div style="display: flex;">
                                    <span class="field-label-small-text" style="width: 20%; padding-top: 2px;"> (First) </span>
                                    <span style="font-weight: 600px; border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; text-align: center;">
                                        ${params.wife_first_name}
                                    </span>
                                </div>
                                <div style="display: flex;">
                                    <span class="field-label-small-text" style="width: 20%; padding-top: 2px;"> (Middle) </span>
                                    <span style="font-weight: 600px; border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; text-align: center;">
                                        ${params.wife_middle_name}
                                    </span>
                                </div>
                                <div style="display: flex;">
                                    <span class="field-label-small-text" style="width: 20%; padding-top: 2px;"> (Last) </span>
                                    <span style="font-weight: 600px; border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; text-align: center;">
                                        ${params.wife_last_name}
                                    </span>
                                </div>
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
                                        ${params.husband_birth_date?.split('-')[2] || ''}
                                    </span>
                                </div>
                                
                                <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
                                <span class="field-label-small-text" style="padding:2px 0 4px 0;">(Month)</span>  
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                    ${params.husband_birth_date?.split('-')[1] || ''}
                                </span>
                                </div>
                                
                                <div style=" height: 100%; display: flex; flex-direction: column; align-items: center; width: 20%; border-right: 0.2px solid rgb(224, 67, 93); ">
                                <span class="field-label-small-text" style="padding:2px 0 4px 0; ">(Year)</span>  
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                    ${params.husband_birth_date?.split('-')[0] || ''}
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
                                    ${params.wife_birth_date?.split('-')[2] || ''}
                                </span>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
                                <span class="field-label-small-text" style="padding:2px 0 4px 0;">(Month)</span>  
                                <span style="ont-weight: 600px; width: 100%; text-align: center;">
                                    ${params.wife_birth_date?.split('-')[1] || ''}
                                </span>
                            </div>
                            
                            <div style=" height: 100%; display: flex; flex-direction: column; align-items: center; width: 20%; border-right: 0.2px solid rgb(224, 67, 93); ">
                                <span class="field-label-small-text" style="padding:2px 0 4px 0; ">(Year)</span>  
                                <span style="font-weight: 600px; width: 100%; text-align: center;">
                                    ${params.wife_birth_date?.split('-')[0] || ''}
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
                                        <span style="font-weight:600px; width: 100%; text-align: center;">
                                            ${params.wife_birth_city || ''}
                                        </span>
                                    </div>
                                    
                                    <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                        <span class="field-label-small-text" style="padding-bottom: 4px;">(Province)</span>
                                        <span style="font-weight:600px; width: 100%; text-align: center;">
                                            ${params.wife_birth_province || ''}
                                        </span>
                                    </div>
                                    
                                    <div style="display: flex; flex-direction: column; align-items: center; width: 20%;">
                                        <span class="field-label-small-text" style="padding-bottom: 4px;">(Country)</span>
                                        <span style="font-weight:600px; width: 100%; text-align: center;">
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
                                        <span style="font-weight:600px; text-align: center; height: 1em;">
                                            ${params.husband_sex || ''}
                                        </span>
                                    </div>
                                    <div style="display: flex; align-items: center; width: 70%; flex-direction: column;">
                                        <span class="field-label-small-text" style="padding:2px 0 4px 0;">(Citizenship)</span>
                                        <span style="font-weight:600px; text-align: center; height: 1em;">
                                            ${params.husband_citizenship || ''}
                                        </span>
                                    </div>
                                </div>
                        
                                <div style="width: 40%;  display: flex; justify-content: space-around;">

                                    <div style="display: flex; justify-content: center; align-items: center; width: 30%; border-right: 0.2px solid rgb(224, 67, 93);">
                                        <span style="font-weight:600px; text-align: center; height: 1em;">
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
                                        <span style="font-weight:600px; width: 100%; text-align: center;">
                                            ${params.husband_residence_barangay || ''}, ${params.husband_residence_city || ''}, ${params.husband_residence_province || ''}, ${params.husband_residence_country || ''}
                                        </span>
                                    </div>
                                </div>      
                        
                                <div style="width: 40%; padding: 4px;  display: flex; align-items: flex-start; justify-content: space-around;">
                                    <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
                                        <span class="field-label-small-text-2" style="padding-bottom: 4px;">(House No., St., House No., St., Barangay, City/Municipality, Province, Country)</span>
                                        <span style="font-weight:600px; width: 100%; text-align: center;">
                                            ${params.wife_residence_barangay || ''}, ${params.wife_residence_city || ''}, ${params.wife_residence_province || ''}, ${params.wife_residence_country || ''}
                                        </span>
                                    </div>
                                </div>      
                            </div>
                        <!-- Religion/ Religious Sect -->
                            <div style="display: flex; width: 100%; border-bottom: 1px solid rgb(224, 67, 93); height: 25px;">
                                <div style="width: 20%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; align-items: center;">
                                    <span style="font-weight: bold; font-size: 10px;">6. Religion/ Religious Sect</span>
                                </div>
                        
                                <div style=" width: 40%; padding: 4px; border-right: 1px solid rgb(224, 67, 93); display: flex; align-items: flex-end;">
                                    <span style="font-weight:600px;  flex-grow: 1; text-align: center;">
                                        ${params.husband_religion || ''}
                                    </span>
                                </div>
                        
                                <div style="width: 40%; padding: 4px; display: flex; align-items: flex-end;">
                                    <span style="font-weight:600px; flex-grow: 1; text-align: center;">
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
                                    <span style=" flex-grow: 1; text-align: center;">
                                        ${params.husband_civil_status || ''}
                                    </span>
                                </div>
                        
                                <div style="width: 40%; padding: 4px; display: flex; align-items: flex-end;">
                                    <span style=" flex-grow: 1; text-align: center;">
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
                                    <span style="font-weight:600px; width: 100%; text-align: center;">
                                        ${params.husband_father_name_first || ''}
                                    </span>
                                </div>
                                
                                <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                    <span class="field-label-small-text" style="padding-bottom: 8px;">(Middle)</span>
                                    <span style="font-weight:600px; width: 100%; text-align: center;">
                                        ${params.husband_father_name_middle || ''}
                                    </span>
                                </div>
                                
                                <div style="display: flex; flex-direction: column; align-items: center; width: 20%;">
                                    <span class="field-label-small-text" style="padding-bottom: 8px;">(Last)</span>
                                    <span style="font-weight:600px; width: 100%; text-align: center;">
                                        ${params.husband_father_name_last || ''}
                                    </span>
                                </div>
                            </div>      
                    
                            <div style="width: 40%; padding: 4px; display: flex; align-items: flex-start; justify-content: space-around;">
                    
                                <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                    <span class="field-label-small-text" style="padding-bottom: 8px;">(First)</span>
                                    <span style="width: 100%; text-align: center;">
                                        ${params.wife_father_name_first || ''}
                                    </span>
                                </div>
                                
                                <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                    <span class="field-label-small-text" style="padding-bottom: 8px;">(Middle)</span>
                                    <span style="width: 100%; text-align: center;">
                                        ${params.wife_father_name_middle || ''}
                                    </span>
                                </div>
                                
                                <div style="display: flex; flex-direction: column; align-items: center; width: 20%;">
                                    <span class="field-label-small-text" style="padding-bottom: 8px;">(Last)</span>
                                    <span style="width: 100%; text-align: center;">
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
                                <span style="font-weight:600px; flex-grow: 1; text-align: center;">
                                    ${params.husband_father_citizenship || ''}
                                </span>
                            </div>
                    
                            <div style="width: 40%; padding: 4px; display: flex; align-items: flex-end;">
                                <span style="font-weight:600px; flex-grow: 1; text-align: center;">
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
                                    <span style="font-weight:600px; width: 100%; text-align: center;">
                                        ${params.husband_mother_name_first || ''}
                                    </span>
                                </div>
                                
                                <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                    <span class="field-label-small-text" style="padding-bottom: 8px;">(Middle)</span>
                                    <span style="font-weight:600px; width: 100%; text-align: center;">
                                        ${params.husband_mother_name_middle || ''}
                                    </span>
                                </div>
                                
                                <div style="display: flex; flex-direction: column; align-items: center; width: 20%;">
                                    <span class="field-label-small-text" style="padding-bottom: 8px;">(Last)</span>
                                    <span style="font-weight:600px; width: 100%; text-align: center;">
                                        ${params.husband_mother_name_last || ''}
                                    </span>
                                </div>
                            </div>      
                    
                            <div style="width: 40%; padding: 4px; display: flex; align-items: flex-start; justify-content: space-around;">
                    
                                <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                    <span class="field-label-small-text" style="padding-bottom: 8px;">(First)</span>
                                    <span style="width: 100%; text-align: center;">
                                        ${params.wife_mother_name_first || ''}
                                    </span>
                                </div>
                                
                                <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                    <span class="field-label-small-text" style="padding-bottom: 8px;">(Middle)</span>
                                    <span style="width: 100%; text-align: center;">
                                        ${params.wife_mother_name_middle || ''}
                                    </span>
                                </div>
                                
                                <div style="display: flex; flex-direction: column; align-items: center; width: 20%;">
                                    <span class="field-label-small-text" style="padding-bottom: 8px;">(Last)</span>
                                    <span style="width: 100%; text-align: center;">
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
                                <span style="  flex-grow: 1; text-align: center;">
                                    ${params.husband_mother_citizenship || ''}
                                </span>
                            </div>
                    
                            <div style="width: 40%; padding: 4px; display: flex; align-items: flex-end;">
                                <span style="flex-grow: 1; text-align: center;">
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
                                    <span style="width: 100%; text-align: center;">
                                        ${params.husband_consent_name_first || ''}
                                    </span>
                                </div>
                                
                                <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                    <span class="field-label-small-text" style="padding-bottom: 8px;">(Middle)</span>
                                    <span style="width: 100%; text-align: center;">
                                        ${params.husband_consent_name_middle || ''}
                                    </span>
                                </div>
                                
                                <div style="display: flex; flex-direction: column; align-items: center; width: 20%;">
                                    <span class="field-label-small-text" style="padding-bottom: 8px;">(Last)</span>
                                    <span style="width: 100%; text-align: center;">
                                        ${params.husband_consent_name_last || ''}
                                    </span>
                                </div>
                            </div>      
                    
                            <div style="width: 40%; padding: 4px; display: flex; align-items: flex-start; justify-content: space-around;">
                    
                                <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                    <span class="field-label-small-text" style="padding-bottom: 8px;">(First)</span>
                                    <span style="width: 100%; text-align: center;">
                                        ${params.wife_consent_name_first || ''}
                                    </span>
                                </div>
                                
                                <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                                    <span class="field-label-small-text" style="padding-bottom: 8px;">(Middle)</span>
                                    <span style="width: 100%; text-align: center;">
                                        ${params.wife_consent_name_middle || ''}
                                    </span>
                                </div>
                                
                                <div style="display: flex; flex-direction: column; align-items: center; width: 20%;">
                                    <span class="field-label-small-text" style="padding-bottom: 8px;">(Last)</span>
                                    <span style="width: 100%; text-align: center;">
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
                                <span style="flex-grow: 1; text-align: center;">
                                    ${params.husband_relationship || ''}
                                </span>
                            </div>
                    
                            <div style="width: 40%; padding: 4px; display: flex; align-items: flex-end;">
                                <span style="flex-grow: 1; text-align: center;">
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
                                    <span style="width: 100%; text-align: center;">
                                        ${params.husband_consent_person_barangay || ''}, ${params.husband_consent_person_city || ''}, ${params.husband_consent_person_province || ''}, ${params.husband_consent_person_country || ''}
                                    </span>
                                </div>
                            </div>      
                    
                            <div style="width: 40%; padding: 4px;  display: flex; align-items: flex-start; justify-content: space-around;">
                                <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
                                    <span class="field-label-small-text-2" style="padding-bottom: 4px;">(House No., St., House No., St., Barangay, City/Municipality, Province, Country)</span>
                                    <span style="width: 100%; text-align: center;">
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
                                <span style="border-bottom: 0.2px solid rgb(224, 67, 93); flex-grow: 1; height: 1em; line-height: 1em;">
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
                                    <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 100%; height: 1em; line-height: 1em; text-align: center;">
                                        ${params.date_of_marriage?.split('-')[2] || ''}
                                    </span>
                                    <span class="field-label-small-text-2" style="margin-top: 2px;">(Day)</span>
                                </div>
                            
                                <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
                                    <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 100%; height: 1em; line-height: 1em; text-align: center;">
                                        ${params.date_of_marriage?.split('-')[1] || ''}
                                    </span>
                                    <span class="field-label-small-text-2" style="margin-top: 2px;">(Month)</span>
                                </div>
                            
                                <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
                                    <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 100%; height: 1em; line-height: 1em; text-align: center;">
                                        ${params.date_of_marriage?.split('-')[0] || ''}
                                    </span>
                                    <span class="field-label-small-text-2" style="margin-top: 2px;">(Year)</span>
                                </div>
                            </div>
                                            
                            <div style="display: flex; align-items: flex-start; width: 40%; padding: 0 5px;">
                                <span style="font-weight: bold; white-space: nowrap; margin-right: 5px;">17. Time of Marriage:</span>
                                <div style="display: flex; flex-grow: 1; align-items: center;">
                                    <span style="border-bottom: 0.2px solid rgb(224, 67, 93); width: 100%; height: 1em; line-height: 1em; text-align: center;">
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
    );
}
module.exports = { generate };