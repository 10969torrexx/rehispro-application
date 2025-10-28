function generate(params) {
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

module.exports = (
    generate
);