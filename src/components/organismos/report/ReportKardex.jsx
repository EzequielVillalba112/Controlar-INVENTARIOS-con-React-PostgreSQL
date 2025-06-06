import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export const ReportKardex = ({ data }) => {
  const renderTableRow = (rowData, isHeader) => (
    <View style={{ flexDirection: "row", marginBottom: 4 }}>
      <Text style={{ width: 200 }}>{rowData.fecha}</Text>
      <Text style={{ width: 300 }}>{rowData.descripcion}</Text>
    </View>
  );

  const currentDate = new Date();
  const formatDate = `${currentDate.toLocaleDateString()} - ${currentDate.toLocaleTimeString()} hs`;

  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <View style={styles.section}>
          <View>
            <Text>Movimiento de kardex</Text>
          </View>
          <View>
            <Text>Fecha y Hora de Impresión: {formatDate}</Text>
          </View>
          <View>
            {renderTableRow({ fecha: "Fecha", descripcion: "Producto" }, true)}
            {data?.map((item, index) => (
              <React.Fragment key={index}>
                {renderTableRow(item)}
              </React.Fragment>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};
