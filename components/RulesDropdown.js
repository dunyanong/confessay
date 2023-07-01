import Link from "next/link";
import { useState } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'
  import { Box } from '@chakra-ui/react'

const RulesDropdown = () => {
    return (
        <Accordion
            defaultIndex={[0]}
            allowMultiple
            className="shadow-md rounded-md"
            >      
        <AccordionItem>
            
            <AccordionButton py={4}>
                <Box as="span" flex='1' textAlign='left'>
                    What is Confessay?
                </Box>
                <AccordionIcon />
            </AccordionButton>    
            <AccordionPanel pb={4}>
                <p className="mb-2 text-gray-700">
                    Confessay is a non-profit platform that allows users to confess their negative emotions and relieve themselves of the burden of carrying them.
                </p>                
            </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
            
            <AccordionButton py={4}>
                <Box as="span" flex='1' textAlign='left'>
                    Why is Confessay created?
                </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
                <p className="mb-2 text-gray-700">
                    The aim of Confessay is to allow people to talk about or express emotion freely and to avoid bottling up emotions.
                    Describing and talking about an emotion out loud tends to decrease its effect of it.
                </p>
            </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
            <AccordionButton py={4}>
                <Box as="span" flex='1' textAlign='left'>
                    Who created Confessay?
                </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
                <p className="mb-2 text-gray-700">
                    Confessay is founded and coded by a Malaysian Engineer, Dun Yan
                </p>
            </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
            <AccordionButton py={4}>
                <Box as="span" flex='1' textAlign='left'>
                    Privacy issues?
                </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4} className="border">
                <p className="mb-2 text-gray-700">
                    Your privacy is safe with us, we do not share your private information with anyone.You will be completely anonymous.
                </p>                
            </AccordionPanel>
        </AccordionItem>
        </Accordion>
    );
}
 
export default RulesDropdown;