/**
 * SPDX-PackageName: Custom Prism Helper
 * SPDX-PackageVersion: 0.0.1
 * SPDX-FileCopyrightText: © 2023 ThysTips <@thystips (GitHub)>
 *                         © 2023 Mario Lopez <@mariolopjr (GitHub)>
 *                         © 2023 Richard Winters <kirvedx@gmail.com> and contributors
 * SPDX-License-Identifier: (Apache-2.0 WITH LLVM-exception OR MIT)
 */

Prism.plugins.autoloader.languages_path = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/';
Prism.plugins.autoloader.ignored_language = 'nonum'; // Update to allow arrays...
Prism.plugins.NormalizeWhitespace.setDefaults({
  'remove-trailing': true,
  'remove-indent': true,
  'left-trim': true,
  'right-trim': true,
});

// Make an array of all <code> elements using [modern] vanilla javascript
var codes = [ ...document.getElementsByTagName( 'code' ) ];

// When the document is ready
document.addEventListener("DOMContentLoaded", () => {
    console.log( 'Custom Prism Helper Triggered' );

    // Set the regex for checking for a powershell prompt
    const regex = /PS[a-zA-z]:\\/g;

    // For each <code> element found, check for shorthand
    codes.forEach( ( code ) => {
        // Check if the element's first class includes a substring flag
        let nonum = code?.classList[0]?.includes( 'language-nonum' );

        // If the flag wasn't found, ensure line-numbers are enabled
        if ( nonum ) {
            // Otherwise, remove line numbers and determine if we are to
            // create command-line output - leveraging provided markdown shorthand
            let providedClass = code.classList[0];
            let codeClass = "language-";

            // Normalize the <code> and the outer <pre>
            // by removing the added line-numbers
            let targetChildren = [ ...code.getElementsByClassName( 'line-numbers-rows' ) ];
            if ( targetChildren.length )
                targetChildren.forEach( ( child ) => code.removeChild( child ) );

            // and the injected shorthand (which gets duplicated to the pre)
            code.classList.remove( providedClass );
            code.classList.remove( 'line-numbers' );
            code.classList.add( 'no-line-numbers' );
            code.parentElement.classList.remove( providedClass );
            code.parentElement.classList.remove( 'line-numbers' );
            code.parentElement.classList.add( 'no-line-numbers' );

            // Here we split the compiled class name by its hyphens, to interpret the
            // shorthand
            let s/*egments*/ = providedClass.split( '-' );

            /**
             * For the example language-nonum-bash-devbox-ubuntu-2-3
             *
             * language is s[0], and is the language prefix added by markdown
             * nonum is s[1], and is the first bit of the string we'd have provided in the codeblock (i.e.```nonum-)
             * bash is s[2], and is the language spec
             * devbox is s[3], and is the positional argument reserved for command-line -host- name.
             * ubuntu is s[4], and is the positional argument reserved for command-line -user- name
             * everything else is the specification of the output range if present.
             */
            const clCount = s.length,
                  clLang = s[2],
                  clHost = ( clCount >= 4 ) ? s[3] === 'l' ? 'localhost' : s[3] : 'none',
                  clUser = ( clCount >= 5 ) ? s[4] === 'ps' ? 'none' : s[4] : 'none';

            // Create the true language class
            codeClass += clLang;

            // And distribute the true language class to the <code> and outer <pre>
            code.classList.add( codeClass );
            code.parentElement.classList.add( codeClass );

            // Enable multiline command
            if ( clLang === 'bash' ) {
                let continuationStrAttribute = document.createAttribute( "data-continuation-str" );
                continuationStrAttribute.value = '\\';
                code.parentElement.attributes.setNamedItem( continuationStrAttribute );
            } else if ( clLang === 'powershell' ) {
                let continuationStrAttribute = document.createAttribute( "data-continuation-str" );
                let continuationPromtAttribute = document.createAttribute( "data-continuation-prompt" );
                continuationStrAttribute.value = '`';
                continuationPromtAttribute.value = '>>';
                code.parentElement.attributes.setNamedItem( continuationStrAttribute );
                code.parentElement.attributes.setNamedItem( continuationPromtAttribute );
            }

            // Sets command line user if exists (and enables command line output for code block)
            if ( clHost !== 'none' ) {
                // Check for powershell spec
                if ( clHost.match( regex ) !== null ) {
                    // i.e. language-nonum-powershell-PSC:\Users\Chris>-ps-2-19
                    // Here we set from 'C:\Users\Chris>` as prompt attribute
                    let promptAttribute = document.createAttribute( "data-prompt" );
                    promptAttribute.value = 'PS ' + clHost.slice( 2 );
                    code.parentElement.attributes.setNamedItem( promptAttribute );
                }
                else {
                    // Otherwise, prepare a terminal output style
                    let hostAttribute = document.createAttribute( "data-host" );
                    hostAttribute.value = clHost;
                    code.parentElement.attributes.setNamedItem( hostAttribute );
                }

                // Our rule of thumb is that a host must be set to enable command-line
                // output - so we'll add the 'command-line' class to the <pre>, per
                // the plug-in's instructions
                code.parentElement.classList.add( 'command-line' );
            }

            // Sets command line user (when command line output is flagged)
            if ( clUser !== 'none' ) {
                let userAttribute = document.createAttribute( "data-user" );
                userAttribute.value = clUser;
                code.parentElement.attributes.setNamedItem( userAttribute );
            }

            // Set command line output lines if exists (limited to single line or range at this time)
            let lines = '';

            // If there are more than enough indices to specify at least a single output line
            if ( clCount >= 6 ) {
                // Indicate the first output line
                lines += s[5];

                // If there are more than a single output line specified
                if ( clCount > 6 ) {
                    // Then capture the end of the range
                    for( let i of s.slice(6)) {
                        lines += '-' + i;
                    }
                }

                // Since we're already acting on known circumstances, specify the output lines
                let outputAttribute = document.createAttribute( "data-output" );
                outputAttribute.value = lines;
                code.parentElement.attributes.setNamedItem( outputAttribute );
            }

            // Finally, run highlight on the resulting <code>
            Prism.highlightElement( code );

            // Changes to the <code>'s parent <pre> were for styling only, do not
            // highlight the parent, or the <code> will be removed.
        }
    });
});
