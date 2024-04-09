
import React from "react";

import { SimpleGrid, Skeleton } from "@mantine/core";


export const Placeholders = () => {
    return <>
      <SimpleGrid cols={4}>
        {/* {Array(16).map(
          (_, index) => <div key={index} style={{ width: 100, height: 100, background: "gray" }} />
        
        )} */}
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
        
      </SimpleGrid>
    </>;
};