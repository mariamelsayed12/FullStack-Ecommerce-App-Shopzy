import { extendTheme, ThemeOverride } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const styles: ThemeOverride["styles"] = {
    global: (props: StyleFunctionProps) => ({
    body: {
        color: mode("gray.800", "whiteAlpha.900")(props),
        bg: mode("gray.100", "#141214")(props),
    },
    }),
};

export const theme = extendTheme({ styles });
