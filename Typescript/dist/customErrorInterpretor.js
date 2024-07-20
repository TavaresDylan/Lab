"use strict";
const customErrorList = [
    {
        errorCode: '1FU00',
        errorName: 'FIELD UNIFORMITY ISSUE',
        analysis: 'Field uniformity',
        message: 'The analysis has failed.</br>' +
            'Please try one of the following actions:</br>' +
            '• Make sure there is no landmark surrounding the </br>' +
            '‘field of rings’ in the image. If yes, crop out all the </br>' +
            'landmarks to remove them.</br>' +
            "• Make sure that no ring of the 'field of rings' is cut </br>" +
            'at the edge of the image. Each ring should be seen in </br>' +
            'full. If not, crop out all the rings that are only partially </br>' +
            'displayed to remove them.</br>' +
            '• Make sure there is no hot pixels in the image. If </br>' +
            'there is any, use the “hot pixels removal” optional </br>' +
            'setting.</br>' +
            'If the problem persists, contact Customer service.',
    },
    {
        errorCode: '1FU01',
        errorName: 'FIELD UNIFORMITY NUMBER OF RINGS ISSUE',
        analysis: 'Field uniformity',
        message: 'The analysis has failed.</br>' +
            'The number of detected rings (i×j) is lower than the </br>' +
            'minimum number of rings required for the analysis to </br>' +
            'work (3×3).</br>' +
            'Please try one of the following actions:</br>' +
            '• If you have cropped, make sure you have </br>' +
            'left enough rings.</br>' +
            '• Acquire a new image containing at least </br>' +
            'the minimum number or rings required.</br>' +
            'If the problem persists, contact Customer service.',
    },
    {
        errorCode: '1FU02',
        errorName: 'FIELD UNIFORMITY GET PROFILE ISSUE',
        analysis: 'Field uniformity',
        message: 'The analysis has failed.</br>' +
            'The line intensity profiles cannot not be generated.</br>' +
            'Please try one of the following actions:</br>' +
            '• Check the quality of your image.</br>' +
            '• Check the acquisition parameters of your </br>' +
            'image.</br>' +
            '• Check the software settings.</br>' +
            'If the problem persists, contact Customer service.</br>',
    },
    {
        errorCode: '1LCRA00',
        errorName: 'LATERAL CO REGISTRATION ACCURACY ISSUE',
        analysis: 'Lateral co-registration accuracy',
        message: 'The analysis has failed.</br>' +
            'Please try one of the following actions:</br>' +
            'Make sure you have selected two images of same type.</br>' +
            'Make sure you have selected two images of same </br>' +
            'dynamic range.</br>' +
            'Make sure the width and height (i.e. the number of </br>' +
            'pixels) of the two images are the same.</br>' +
            'Make sure there is no landmark surrounding the ‘field of </br>' +
            'rings’ in the image. If yes, crop out all the landmarks to </br>' +
            'remove them.</br>' +
            "Make sure that no ring of the 'field of rings' is cut at the </br>" +
            'edge of the image. Each ring should be seen in full. If </br>' +
            'not, crop out all the rings that are only partially displayed </br>' +
            'to remove them.</br>' +
            'Make sure the field non-uniformity is not too important. </br>' +
            "To check this, perform the 'field uniformity' analysis and </br>" +
            'check the roll-off values. Large roll-off values (typically </br>' +
            "higher than 50 %) prevent from the ‘lateral co-registration accuracy' analysis from working correctly.</br>" +
            'If the problem persists, contact Customer service.',
    },
    {
        errorCode: '1LCRA01',
        errorName: 'LATERAL CO REGISTRATION ACCURACY NUMBER OF RINGS ISSUE',
        analysis: 'Lateral co-registration accuracy',
        message: 'The analysis has failed.</br>' +
            'The number of detected rings (i×j) is lower than the </br>' +
            'minimum number of rings required for the analysis to </br>' +
            'work (2×2).</br>' +
            'Please try one of the following actions:</br>' +
            '• If you have cropped, make sure you have left </br>' +
            'enough rings.</br>' +
            '• Acquire a new image containing at least the </br>' +
            'minimum number or rings required.</br>' +
            'If the problem persists, contact Customer service',
    },
    {
        errorCode: '1LCRA02',
        errorName: 'LATERAL CO REGISTRATION ACCURACY COMPARISON ISSUE',
        analysis: 'Lateral co-registration accuracy',
        message: 'The analysis has failed.</br>' +
            'The number of detected rings is different from one </br>' +
            'image to another.</br>' +
            'This issue is usually due to peripherical rings.</br>' +
            'Please try one of the following actions:</br>' +
            '• Make sure you acquired the two images with the </br>' +
            'same number of rings.</br>' +
            '• If not, crop the images so that there is the same </br>' +
            'number of rings.</br>' +
            'If the problem persists, contact Customer service.',
    },
    {
        errorCode: '1LR00',
        errorName: 'LATERAL RESOLUTION ISSUE',
        analysis: 'Lateral resolution',
        message: 'The analysis has failed.</br>' +
            'Please try one of the following actions:</br>' +
            '• Make sure the value of the specified lateral pixel </br>' +
            'size is correct.</br>' +
            '• Visually check that the inner lines of at least one </br>' +
            'group of lines can be spatially resolved.</br>' +
            '• Try to improve the rotation correction of the </br>' +
            'pattern in the image. To do that, in the ‘Start </br>' +
            "analysis’ window, tick the box 'Orientation </br>" +
            "correction’, set it to 'Manual entry' and input a </br>" +
            'better value for the correction angle.</br>' +
            'If the problem persists, contact Customer service.',
    },
    {
        errorCode: '1LR01',
        errorName: 'LATERAL RESOLUTION FIT INITIALIZATION ISSUE',
        analysis: 'Lateral resolution',
        message: 'The analysis has failed.</br>' +
            'The initialization of the fit cannot be performed </br>' +
            'correctly.</br>' +
            'Please try one of the following actions:</br>' +
            '• Make sure the specified lateral pixel size of the </br>' +
            'image is correct.</br>' +
            '• If you are sure the specified lateral pixel size is </br>' +
            'correct, try to change the fitting function (from </br>' +
            'Gaussian to Lorentzian, or vice-versa).</br>' +
            '• If changing the fitting function does not make the </br>' +
            'analysis work, make sure that at least one group </br>' +
            'of lines can be resolved.</br>' +
            '• If none of these actions make the analysis work, </br>' +
            'check the quality of your image.</br>' +
            'If the problem persists, contact Customer service.',
    },
    {
        errorCode: '1LR02',
        errorName: 'LATERAL RESOLUTION NUMBER OF DETECTED LINE GROUPS ISSUE',
        analysis: 'Lateral resolution',
        message: 'The analysis has failed.</br>' +
            'The number of detected line groups (i) is different from </br>' +
            'the expected one (j).</br>' +
            'The expected numbers of line groups are: 13 for Argo-HM, 14 for Argo-SIM, 14 for Argo-Check Resolution, and </br>' +
            '10 for Argo-Z.</br>' +
            'Please try one of the following actions:</br>' +
            '• Make sure the value of the specified lateral pixel </br>' +
            'size is correct.</br>' +
            '• Make sure you have selected the right product in </br>' +
            "the 'Settings' panel.</br>" +
            '• Visually check that the inner lines of at least one </br>' +
            'group of lines can be spatially resolved.</br>' +
            'If the problem persists, contact Customer service.',
    },
    {
        errorCode: '1LR03',
        errorName: 'LATERAL RESOLUTION FIT ISSUE',
        analysis: 'Lateral resolution',
        message: 'The analysis has failed.</br>' +
            'The fit of the intensity line profile cannot be performed.</br>' +
            'Please try one of the following actions:</br>' +
            '• Check the quality of your image.</br>' +
            '• Check the acquisition parameters of your image.</br>' +
            '• Check the software settings.</br>' +
            'If the problem persists, contact Customer service.',
    },
    {
        errorCode: '1LR04',
        errorName: 'LATERAL RESOLUTION CONTRAST TRANSFER FUNCTION FIT ISSUE',
        analysis: 'Lateral resolution',
        message: 'The analysis has failed.</br>' +
            'The fit of the contrast transfer function cannot be </br>' +
            'performed.</br>' +
            'If the problem persists, contact Customer service.',
    },
    {
        errorCode: '1LR05',
        errorName: 'LATERAL RESOLUTION LINE GROUP ISSUE',
        analysis: 'Lateral resolution',
        message: 'The analysis has failed.</br>' +
            'Either the detection of the line groups, the detection of </br>' +
            'the peaks and/or valleys, the calculation of the contrasts </br>' +
            'and/or line spacings, cannot be performed.</br>' +
            'Please try one of the following actions:</br>' +
            '• Check the quality of your image.</br>' +
            '• Check the acquisition parameters of your image.</br>' +
            '• Check the software settings.</br>' +
            'If the problem persists, contact Customer service.',
    },
    {
        errorCode: '1LR06',
        errorName: 'LATERAL RESOLUTION AUTO CROP ISSUE',
        analysis: 'Lateral resolution',
        message: 'The analysis has failed.</br>' +
            'The auto-crop of the pattern in the image cannot be </br>' +
            'performed.</br>' +
            'Please try one of the following actions:</br>' +
            '• Check the quality of your image.</br>' +
            '• Check the acquisition parameters of your image.</br>' +
            '• Check the software settings.</br>' +
            'If the problem persists, contact Customer service.',
    },
    {
        errorCode: '1SRR00',
        errorName: 'STAGE REPOSITIONING REPEATABILITY ISSUE',
        analysis: 'Stage repositioning repeatability',
        message: 'The analysis has failed.</br>' +
            'Please try one of the following actions:</br>' +
            '• Make sure you have selected the right pattern </br>' +
            'for this analysis.</br>' +
            '• Make sure there is no hot pixels in the image. If </br>' +
            'there is any, use the “hot pixels removal” </br>' +
            'optional setting.</br>' +
            'If the problem persists, contact Customer service.',
    },
    {
        errorCode: '1SRR01',
        errorName: 'STAGE REPOSITIONING REPEATABILITY IMAGE TYPE ACQUISITION ISSUE',
        analysis: 'Stage repositioning repeatability',
        message: 'This analysis requires a stack.</br>' +
            'Please select a stack or acquire one.</br>' +
            'If the problem persists, contact Customer service.',
    },
    {
        errorCode: '1IR4X400',
        errorName: 'INTENSITY RESPONSE 4X4 ISSUE',
        analysis: 'Intensity response 4x4',
        message: 'The analysis has failed.</br>' +
            'Either the detection of the intensity levels, the detection </br>' +
            'of the peaks, the calculation of the average intensities </br>' +
            'and/or standard deviations, cannot be performed.</br>' +
            'Please try one of the following actions:</br>' +
            '• Check the quality of your image.</br>' +
            '• Check the acquisition parameters of your image.</br>' +
            '• Check the software settings.</br>' +
            'If the problem persists, contact Customer service.',
    },
    {
        errorCode: '1IR4X401',
        errorName: 'INTENSITY RESPONSE 4X4 LEVEL DETECTION ISSUE',
        analysis: 'Intensity response 4x4',
        message: 'The analysis has failed.</br>' +
            'Either the detection of the intensity levels, the detection </br>' +
            'of the peaks, the calculation of the average intensities </br>' +
            'and/or standard deviations, cannot be performed.</br>' +
            'Please try one of the following actions:</br>' +
            '• Check the quality of your image.</br>' +
            '• Check the acquisition parameters of your image.</br>' +
            '• Check the software settings.</br>' +
            'If the problem persists, contact Customer service.',
    },
    {
        errorCode: '1IR4X402',
        errorName: 'INTENSITY RESPONSE 4X4 COMPARISON ISSUE',
        analysis: 'Intensity response 4x4',
        message: 'The intensity response comparison has failed.</br>' +
            'Please try one of the following actions:</br>' +
            '• Check the quality of your image.</br>' +
            '• Check the acquisition parameters of your image.</br>' +
            '• Check the software settings.</br>' +
            'If the problem persists, contact Customer service',
    },
    {
        errorCode: '1IR4X403',
        errorName: ' INTENSITY RESPONSE 4X4 A DETECTION ISSUE',
        analysis: 'Intensity response 4x4',
        message: 'The analysis has failed.</br>' +
            'The “A” marker cannot be detected.</br>' +
            'Please try one of the following actions:</br>' +
            '• Check the quality of your image.</br>' +
            '• Check the acquisition parameters of your image.</br>' +
            '• Check the software settings.</br>' +
            'If the problem persists, contact Customer service.',
    },
    {
        errorCode: '1IR4X404',
        errorName: 'INTENSITY RESPONSE 4X4 A DETECTION ISSUE',
        analysis: 'Intensity response 4x4',
        message: 'The analysis has failed.</br>' +
            'The “A” marker cannot be detected.</br>' +
            'Please try one of the following actions:</br>' +
            '• Check the quality of your image.</br>' +
            '• Check the acquisition parameters of your image.</br>' +
            '• Check the software settings.</br>' +
            'If the problem persists, contact Customer service.',
    },
    {
        errorCode: '1IR4X405',
        errorName: 'INTENSITY RESPONSE 4X4 A DETECTION ISSUE',
        analysis: 'Intensity response 4x4',
        message: 'The analysis has failed.</br>' +
            'The “A” marker cannot be detected.</br>' +
            'Please try one of the following actions:</br>' +
            '• Check the quality of your image.</br>' +
            '• Check the acquisition parameters of your image.</br>' +
            '• Check the software settings.</br>' +
            'If the problem persists, contact Customer service.',
    },
    {
        errorCode: '1IR2X1600',
        errorName: 'INTENSITY RESPONSE 2X16 ISSUE',
        analysis: 'Intensity response 2x16',
        message: 'The analysis has failed.</br>' +
            'Please try one of the following actions:</br>' +
            '• Make sure you have selected the right pattern </br>' +
            'for this analysis.</br>' +
            'If not the case, select the pattern ‘2×16 gradation’ </br>' +
            "in the 'Required settings  Select your pattern’.</br>" +
            '• Crop the image to exclude the areas where the </br>' +
            'background is high compared to the pattern </br>' +
            'intensity.</br>' +
            'If the problem persists, contact Customer service.',
    },
    {
        errorCode: '1IR2X1601',
        errorName: 'INTENSITY RESPONSE 2X16 LEVEL DETECTION ISSUE',
        analysis: 'Intensity response 2x16',
        message: 'The analysis has failed.</br>' +
            'Either the detection of the intensity levels, the detection </br>' +
            'of the peaks, the calculation of the average intensities </br>' +
            'and/or standard deviations, cannot be performed.</br>' +
            'Please try one of the following actions:</br>' +
            '• Check the quality of your image.</br>' +
            '• Check the acquisition parameters of your image.</br>' +
            '• Check the software settings.</br>' +
            'If the problem persists, contact Customer service.',
    },
    {
        errorCode: '1IR2X1602',
        errorName: '2 INTENSITY RESPONSE 2X16 COMPARISON ISSUE',
        analysis: 'Intensity response 2x16',
        message: 'The intensity response comparison has failed.</br>' +
            'Please try one of the following actions:</br>' +
            '• Check the quality of your image.</br>' +
            '• Check the acquisition parameters of your image.</br>' +
            '• Check the software settings.</br>' +
            'If the problem persists, contact Customer service.',
    },
    {
        errorCode: '1IR2X1603',
        errorName: '3 INTENSITY RESPONSE 2X16 COMPARISON EMPTY DATA ISSUE',
        analysis: 'Intensity response 2x16',
        message: 'The intensity response comparison has failed.</br>' +
            'Please make sure the ‘reference intensity response’ is </br>' +
            'not null.</br>' +
            'If the problem persists, contact Customer service.',
    },
    {
        errorCode: '1IR2X1604',
        errorName: 'INTENSITY RESPONSE 2X16 COMPARISON DATA LENGTH ISSUE',
        analysis: 'Intensity response 2x16',
        message: 'The intensity response comparison has failed.</br>' +
            'Please make sure the ‘reference intensity response’ has </br>' +
            'the same number of points as the ‘extracted intensity </br>' +
            'response’.</br>' +
            'If the problem persists, contact Customer service.',
    },
];
const customErrorInterpreter = (rawError) => {
    const rawErrorSplitArray = rawError.split(';');
    const ErrorCodeErrorName = rawErrorSplitArray.slice(rawErrorSplitArray.length - 1, rawErrorSplitArray.length);
    const errorCode = ErrorCodeErrorName[0].split(':')[0].replaceAll('\n', '');
    const relatedError = customErrorList.find((customError) => customError.errorCode === errorCode);
    if (!relatedError) {
        throw new Error('No custom error matched');
    }
    return relatedError?.message;
};
customErrorInterpreter('15;T50%[C 3][T 0];intensityResponse4x4;1IR4X400:INTENSITY RESPONSE 4X4 ISSUE');
customErrorInterpreter('15;T50%[C 3][T 0];intensityResponse4x4;1IR4X600:INTENSITY RESPONSE 4X4 ISSUE');
