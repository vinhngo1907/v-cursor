apiVersion: v1
kind: Service
metadata:
  name: {{ include "nest-api.fullname" . }}
  labels:
    {{- include "nest-api.labels" . | nindent 4 }}
spec:
  type: {{ .Values.service.type }}
  ports:
    - port: {{ .Values.service.port }}
      targetPort: {{ .Values.service.port }}
      protocol: TCP
      name: http
  selector:
    {{- include "nest-api.selectorLabels" . | nindent 4 }}
